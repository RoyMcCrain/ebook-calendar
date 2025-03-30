import { queryOptions } from "@tanstack/react-query";
import camelcaseKeys from "camelcase-keys";
import type { Response } from "#/lib/queries/type";

const MANGA_GENRE_ID = "101904"; // 電子書籍のジャンルID

export async function fetchBookDetail({
	page = 1,
	seriesName,
}: {
	page?: number;
	seriesName: string;
}): Promise<Response> {
	if (seriesName === "") {
		throw new Error("シリーズ名が空です");
	}
	const url = new URL(import.meta.env.VITE_KOBO_API_URL);
	const seriesParams = new URLSearchParams({
		applicationId: import.meta.env.VITE_KOBO_APP_ID,
		keyword: seriesName,
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
	return camelcaseKeys(seriesData, { deep: true });
}

export default function ({
	page,
	seriesName,
	...props
}: { page: number; seriesName: string; [key: string]: unknown }) {
	return queryOptions({
		...props,
		queryKey: ["books-detail", page, seriesName],
		queryFn: () => fetchBookDetail({ page, seriesName }),
	});
}
