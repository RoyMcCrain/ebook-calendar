import camelcaseKeys from "camelcase-keys";
import type { Response } from "#/lib/queries/type";

const MANGA_GENRE_ID = "101904"; // 電子書籍のジャンルID

export async function fetchBookDetail({
	page = 1,
	itemNumber,
}: { page?: number; itemNumber: string }): Promise<
	Response & { seriesName: string }
> {
	const bookDetailParams = new URLSearchParams({
		applicationId: import.meta.env.VITE_KOBO_APP_ID,
		itemNumber,
		koboGenreId: MANGA_GENRE_ID,
		formatVersion: "2", // レスポンスのフォーマットバージョン
	});

	const url = new URL(import.meta.env.VITE_KOBO_API_URL);
	url.search = bookDetailParams.toString();

	const bookDetailResponse = await fetch(url);
	if (!bookDetailResponse.ok) {
		throw new Error("データ取得に失敗しました");
	}

	const bookDetailData: Response = await bookDetailResponse.json();
	const result = camelcaseKeys(bookDetailData, { deep: true });

	if (!result.items[0].seriesName) {
		// シリーズ名がない場合は、ページを取得しない
		return { ...result, seriesName: "" };
	}

	const seriesParams = new URLSearchParams({
		applicationId: import.meta.env.VITE_KOBO_APP_ID,
		keyword: result.items[0].seriesName ?? "",
		sort: "-releaseDate", // 新刊順にソート
		koboGenreId: MANGA_GENRE_ID,
		hits: "10", // 最大10件取得
		formatVersion: "2", // レスポンスのフォーマットバージョン
		page: page.toString(), // ページ番号を追加
	});
	url.search = seriesParams.toString();
	const seriesResponse = await fetch(url);
	if (!seriesResponse.ok) {
		throw new Error("データ取得に失敗しました");
	}
	const seriesData: Response = await seriesResponse.json();
	const res = camelcaseKeys(seriesData, { deep: true });
	return { ...res, seriesName: result.items[0].seriesName };
}
