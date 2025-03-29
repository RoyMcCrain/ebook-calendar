import camelcaseKeys from "camelcase-keys";
import type { Response } from "#/lib/queries/type";

const MANGA_GENRE_ID = "101904"; // 電子書籍のジャンルID

// データ取得用の関数
export async function fetchBooks({
	page = 1,
	keyword = "",
	distinctSeries = false, // シリーズ名で重複排除するフラグを追加
}: {
	page?: number;
	keyword?: string;
	distinctSeries?: boolean; // 新しいパラメータ型を追加
} = {}) {
	const params = new URLSearchParams({
		applicationId: import.meta.env.VITE_KOBO_APP_ID,
		sort: "-releaseDate", // 新刊順にソート
		koboGenreId: MANGA_GENRE_ID,
		hits: "10", // 最大10件取得
		formatVersion: "2", // レスポンスのフォーマットバージョン
		page: page.toString(), // ページ番号を追加
	});
	if (keyword !== "") {
		// キーワードパラメータに追加
		params.append("keyword", keyword);
	}

	const url = new URL(import.meta.env.VITE_KOBO_API_URL);
	url.search = params.toString();

	const response = await fetch(url);
	if (!response.ok) {
		throw new Error("データ取得に失敗しました");
	}

	const data: Response = await response.json();
	const camelcasedData = camelcaseKeys(data, { deep: true });

	// distinctSeriesがtrueの場合、シリーズ名で重複排除する
	if (distinctSeries && camelcasedData.items) {
		const uniqueSeriesMap = new Map();
		const uniqueItems = camelcasedData.items.filter((item) => {
			// シリーズ名がない場合はそのまま含める
			if (!item.seriesName) return true;

			// 初めて出てきたシリーズ名なら残す
			if (!uniqueSeriesMap.has(item.seriesName)) {
				uniqueSeriesMap.set(item.seriesName, true);
				return true;
			}
			// 既に同じシリーズ名があれば除外
			return false;
		});

		// 重複排除したアイテムに置き換えて返却
		return {
			...camelcasedData,
			items: uniqueItems,
		};
	}

	return camelcasedData;
}
