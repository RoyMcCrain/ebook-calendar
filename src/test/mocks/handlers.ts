import { http, HttpResponse } from "msw";

// テスト用の書籍データ
const mockBookData = {
	count: 100,
	page: 1,
	first: 1,
	last: 10,
	hits: 10,
	pageCount: 10,
	items: [
		{
			title: "テスト書籍",
			author: "テスト著者",
			publisherName: "テスト出版社",
			itemNumber: "test-123",
			itemCaption: "テスト説明文",
			salesDate: "2023年5月1日",
			itemPrice: 1500,
			itemUrl: "https://example.com/book",
			smallImageUrl: "https://example.com/small.jpg",
			mediumImageUrl: "https://example.com/medium.jpg",
			largeImageUrl: "https://example.com/large.jpg",
			reviewCount: 10,
			reviewAverage: 4.5,
		},
		// 他の9冊の書籍データ（配列の長さを10にするため）
		...Array(9)
			.fill(0)
			.map((_, i) => ({
				title: `テスト書籍 ${i + 2}`,
				author: "テスト著者",
				publisherName: "テスト出版社",
				itemNumber: `test-${i + 2}`,
				itemCaption: "テスト説明文",
				salesDate: "2023年5月1日",
				itemPrice: 1500,
				itemUrl: "https://example.com/book",
				smallImageUrl: "https://example.com/small.jpg",
				mediumImageUrl: "https://example.com/medium.jpg",
				largeImageUrl: "https://example.com/large.jpg",
				reviewCount: 10,
				reviewAverage: 4.5,
			})),
	],
};

// 別ページ用データ
const mockBookDataPage3 = {
	...mockBookData,
	page: 3,
	first: 21,
	last: 30,
	items: [
		{
			...mockBookData.items[0],
			title: "テスト書籍 ページ3",
			itemNumber: "test-page3",
		},
		// 他の9冊の書籍データ（配列の長さを10にするため）
		...Array(9)
			.fill(0)
			.map((_, i) => ({
				title: `テスト書籍 ページ3-${i + 2}`,
				author: "テスト著者",
				publisherName: "テスト出版社",
				itemNumber: `test-page3-${i + 2}`,
				itemCaption: "テスト説明文",
				salesDate: "2023年5月1日",
				itemPrice: 1500,
				itemUrl: "https://example.com/book",
				smallImageUrl: "https://example.com/small.jpg",
				mediumImageUrl: "https://example.com/medium.jpg",
				largeImageUrl: "https://example.com/large.jpg",
				reviewCount: 10,
				reviewAverage: 4.5,
			})),
	],
};

// MSWのハンドラー定義
export const handlers = [
	// 楽天書籍APIのモック
	http.get("https://api.example.com", ({ request }) => {
		const url = new URL(request.url);
		const page = url.searchParams.get("page");

		// ページに応じてレスポンスを変更
		if (page === "3") {
			return HttpResponse.json(mockBookDataPage3);
		}

		return HttpResponse.json(mockBookData);
	}),

	// エラーレスポンスのテスト用ハンドラー
	http.get("*/error-test", () => {
		return new HttpResponse(null, { status: 500 });
	}),
];
