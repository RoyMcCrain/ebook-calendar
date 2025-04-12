import { format } from "date-fns";

/**
 * 今日の日付を「yyyy-MM-dd」形式でフォーマットして返します
 *
 * @returns 「yyyy-MM-dd」形式でフォーマットされた今日の日付
 */
export const formatToday = () => {
	const today = new Date();
	return format(today, "yyyy-MM-dd");
};

/**
 * 指定した日付を「yyyy-MM-dd」形式でフォーマットして返します
 *
 * @param date フォーマットする日付オブジェクト
 * @returns 「yyyy-MM-dd」形式でフォーマットされた日付
 */
export const formatDate = (date: Date) => {
	return format(date, "yyyy-MM-dd");
};
