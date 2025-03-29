import { http, HttpResponse } from "msw";
import { describe, expect, it, vi } from "vitest";
import { server } from "#/test/setup";
import fetchBooks from "./books";

// importメタのモック
// VSCodeのIntelliSenseでエラーが出ないようにする型定義
declare global {
	interface ImportMetaEnv {
		VITE_KOBO_APP_ID: string;
		VITE_KOBO_API_URL: string;
	}
}

// インポートメタのモック
vi.stubGlobal("import.meta", {
	env: {
		VITE_KOBO_APP_ID: "test-app-id",
		VITE_KOBO_API_URL: "https://api.example.com",
	},
});

describe("fetchBooks", () => {
	it("デフォルトのパラメータで正常にデータを取得できること", async () => {
		const result = await fetchBooks();

		// 基本的な結果の検証
		expect(result).toBeDefined();
		expect(result.items).toHaveLength(10);
		expect(result.items[0].title).toBe("テスト書籍");
		expect(result.pageCount).toBe(10);
	});

	it("ページパラメータを指定した場合、正しく取得できること", async () => {
		const result = await fetchBooks({ page: 3 });

		// ページ3のデータを確認
		expect(result).toBeDefined();
		expect(result.page).toBe(3);
		expect(result.items[0].title).toBe("テスト書籍 ページ3");
	});

	it("APIがエラーを返した場合、例外がスローされること", async () => {
		// 一時的にエラーハンドラーを追加
		server.use(
			http.get("https://api.example.com", () => {
				return new HttpResponse(null, { status: 500 });
			}),
		);

		// 例外がスローされることを検証
		await expect(fetchBooks()).rejects.toThrow("データ取得に失敗しました");
	});

	it("fetch自体が失敗した場合、例外がスローされること", async () => {
		// 一時的にネットワークエラーを模倣するハンドラーを追加
		server.use(
			http.get("https://api.example.com", () => {
				return HttpResponse.error();
			}),
		);

		// 例外がスローされることを検証
		await expect(fetchBooks()).rejects.toThrow();
	});
});
