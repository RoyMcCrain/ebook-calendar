import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import {
	afterAll,
	afterEach,
	beforeAll,
	describe,
	expect,
	it,
	vi,
} from "vitest";
import { fetchBooks } from "./list";

// テスト用のモックデータ
const mockBooksResponse = {
	Items: [
		{
			title: "テスト漫画1",
			author: "テスト作家1",
			item_price: 500,
			sales_date: "2023-01-01",
			item_url: "https://example.com/book1",
		},
		{
			title: "テスト漫画2",
			author: "テスト作家2",
			item_price: 600,
			sales_date: "2023-01-02",
			item_url: "https://example.com/book2",
		},
	],
};

// MSWサーバーのセットアップ
const server = setupServer(
	http.get("https://api.example.com/books", ({ request }) => {
		// クエリパラメータのチェック
		const url = new URL(request.url);
		const applicationId = url.searchParams.get("applicationId");
		// バリデーションチェック
		if (applicationId !== "test-app-id") {
			return HttpResponse.json(
				{ error: "不正なアプリケーションID" },
				{ status: 401 },
			);
		}

		return HttpResponse.json(mockBooksResponse);
	}),
);

// テストの前後処理
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("fetchBooks", () => {
	it("デフォルトパラメータで書籍データを正しく取得できる", async () => {
		const result = await fetchBooks();

		// camelcaseKeysによって変換された結果を期待
		expect(result.items).toBeDefined();
		expect(result.items.length).toBe(2);
		expect(result.items[0].title).toBe("テスト漫画1");
		expect(result.items[1].salesDate).toBe("2023-01-02");
	});

	it("キーワードパラメータを指定して検索できる", async () => {
		// キーワード検索用のハンドラーを追加
		server.use(
			http.get("https://api.example.com/books", ({ request }) => {
				const url = new URL(request.url);
				const keyword = url.searchParams.get("keyword");
				expect(keyword).toBe("テスト検索");

				return HttpResponse.json({
					Items: [mockBooksResponse.Items[0]],
				});
			}),
		);

		const result = await fetchBooks({ keyword: "テスト検索" });
		expect(result.items.length).toBe(1);
	});

	it("ページパラメータを指定して取得できる", async () => {
		// ページ指定用のハンドラーを追加
		server.use(
			http.get("https://api.example.com/books", ({ request }) => {
				const url = new URL(request.url);
				const page = url.searchParams.get("page");
				expect(page).toBe("2");

				return HttpResponse.json({
					Items: [mockBooksResponse.Items[1]],
				});
			}),
		);

		const result = await fetchBooks({ page: 2 });
		expect(result.items.length).toBe(1);
		expect(result.items[0].title).toBe("テスト漫画2");
	});

	it("APIがエラーを返したとき例外がスローされる", async () => {
		// エラーレスポンス用のハンドラーを追加
		server.use(
			http.get("https://api.example.com/books", () => {
				return new HttpResponse(null, { status: 500 });
			}),
		);

		await expect(fetchBooks()).rejects.toThrow("データ取得に失敗しました");
	});
});
