import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import { fetchBookDetail } from "./detail";

// テスト用のモックデータ
const mockBookDetailData = {
	Items: [
		{
			item_number: "123456",
			title: "テスト本",
			series_name: "テストシリーズ",
			item_price: 500,
			sales_date: "2023-01-01",
			item_url: "https://example.com/book1",
		},
	],
};

const mockSeriesData = {
	Items: [
		{
			item_number: "123456",
			title: "テスト本",
			series_name: "テストシリーズ",
			item_price: 500,
			sales_date: "2023-01-01",
			item_url: "https://example.com/book1",
		},
		{
			item_number: "123457",
			title: "テスト本2",
			series_name: "テストシリーズ",
			item_price: 600,
			sales_date: "2023-01-15",
			item_url: "https://example.com/book2",
		},
	],
};

// MSWサーバーのセットアップ
const server = setupServer(
	// 本の詳細情報APIのハンドラー
	http.get("https://api.example.com/books", ({ request }) => {
		const url = new URL(request.url);
		const seriesName = url.searchParams.get("seriesName");
		const keyword = url.searchParams.get("keyword");

		// seriesNameが空の場合はエラーを返す
		if (seriesName === "") {
			return new HttpResponse(null, { status: 400 });
		}

		// 詳細情報リクエストの場合 - シリーズ名があるケース
		if (seriesName === "テストシリーズ") {
			return HttpResponse.json(mockBookDetailData);
		}
		// シリーズ名で検索する場合
		if (keyword === "テストシリーズ") {
			return HttpResponse.json(mockSeriesData);
		}

		return HttpResponse.json({ Items: [] });
	}),
);

// テストの前後処理
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("fetchBookDetail", () => {
	it("シリーズ名がある場合、本の詳細と関連シリーズ情報を取得するっス", async () => {
		const result = await fetchBookDetail({ seriesName: "テストシリーズ" });

		// 検証
		expect(result.items).toHaveLength(2);
		expect(result.items[0].itemNumber).toBe("123456");
		expect(result.items[0].title).toBe("テスト本");
		expect(result.items[0].seriesName).toBe("テストシリーズ");
		expect(result.items[1].itemNumber).toBe("123457");
	});

	it("APIエラー時に適切にエラーをスローするっス", async () => {
		// エラーレスポンス用のハンドラーを追加
		server.use(
			http.get("https://api.example.com/books", () => {
				return new HttpResponse(null, { status: 500 });
			}),
		);

		// エラーがスローされることを検証
		await expect(
			fetchBookDetail({ seriesName: "テストシリーズ" }),
		).rejects.toThrow("データ取得に失敗しました");
	});

	it("ページパラメータが正しく渡されるかテストするっス", async () => {
		// ページ指定用のハンドラーを追加
		server.use(
			http.get("https://api.example.com/books", ({ request }) => {
				const url = new URL(request.url);
				const page = url.searchParams.get("page");
				const keyword = url.searchParams.get("keyword");

				// 最初は詳細情報を返す
				if (!keyword) {
					return HttpResponse.json(mockBookDetailData);
				}

				// 2ページ目のシリーズ検索の場合
				if (keyword === "テストシリーズ" && page === "2") {
					return HttpResponse.json({
						Items: [
							{
								item_number: "123458",
								title: "テスト本3",
								series_name: "テストシリーズ",
							},
						],
					});
				}

				return HttpResponse.json(mockSeriesData);
			}),
		);

		const result = await fetchBookDetail({
			seriesName: "テストシリーズ",
			page: 2,
		});

		// 検証
		expect(result.items).toHaveLength(1);
		expect(result.items[0].itemNumber).toBe("123458");
		expect(result.items[0].title).toBe("テスト本3");
	});

	it("シリーズ名が空の場合、エラーになるっス", async () => {
		// エラーがスローされることを検証
		await expect(fetchBookDetail({ seriesName: "" })).rejects.toThrow(
			"シリーズ名が空です",
		);
	});
});
