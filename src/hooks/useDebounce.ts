import { useEffect, useState } from "react";

/**
 * 入力値に対してデバウンス処理を行うカスタムフック
 * @param value デバウンス対象の値
 * @param delay 遅延時間（ミリ秒）
 * @returns デバウンスされた値
 */
export function useDebounce<T>(value: T, delay: number): T {
	const [debouncedValue, setDebouncedValue] = useState<T>(value);

	useEffect(() => {
		// 遅延後に値を更新するタイマーをセット
		const timer = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		// コンポーネントがアンマウントされた時やvalue/delayが変わった時にタイマーをクリア
		return () => {
			clearTimeout(timer);
		};
	}, [value, delay]);

	return debouncedValue;
}
