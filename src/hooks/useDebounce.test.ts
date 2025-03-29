import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useDebounce } from "./useDebounce";

describe("useDebounce", () => {
	// モックタイマーを使用してテストを高速化
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it("初期値を正しく返すっス", () => {
		const { result } = renderHook(() => useDebounce("initial value", 500));

		// 初期値が即座に設定されるか確認
		expect(result.current).toBe("initial value");
	});

	it("遅延後に更新された値を返すっス", () => {
		const { result, rerender } = renderHook(
			({ value, delay }) => useDebounce(value, delay),
			{ initialProps: { value: "initial value", delay: 500 } },
		);

		// 値を更新
		rerender({ value: "updated value", delay: 500 });

		// 遅延前は古い値を返すか確認
		expect(result.current).toBe("initial value");

		// タイマーを進める
		act(() => {
			vi.advanceTimersByTime(500);
		});

		// 遅延後に新しい値を返すか確認
		expect(result.current).toBe("updated value");
	});

	it("遅延時間が経過する前に値が再更新された場合、タイマーがリセットされるっス", () => {
		const { result, rerender } = renderHook(
			({ value, delay }) => useDebounce(value, delay),
			{ initialProps: { value: "initial value", delay: 500 } },
		);

		// 値を一度目の更新
		rerender({ value: "updated value", delay: 500 });

		// 300ms経過
		act(() => {
			vi.advanceTimersByTime(300);
		});

		// まだ遅延が完了していないので初期値のまま
		expect(result.current).toBe("initial value");

		// 値を二度目の更新
		rerender({ value: "updated again", delay: 500 });

		// さらに300ms経過（最初の更新から合計600ms）
		act(() => {
			vi.advanceTimersByTime(300);
		});

		// 二度目の更新からは500msに達していないのでまだ値は変わらない
		expect(result.current).toBe("initial value");

		// さらに200ms経過（二度目の更新から合計500ms）
		act(() => {
			vi.advanceTimersByTime(200);
		});

		// 二度目の更新から500ms経過したので最新の値になる
		expect(result.current).toBe("updated again");
	});

	it("遅延時間が変更された場合も正しく動作するっス", () => {
		const { result, rerender } = renderHook(
			({ value, delay }) => useDebounce(value, delay),
			{ initialProps: { value: "test value", delay: 500 } },
		);

		// 遅延時間を変更
		rerender({ value: "test value", delay: 1000 });

		// 500ms経過
		act(() => {
			vi.advanceTimersByTime(500);
		});

		// まだ新しい遅延時間（1000ms）に達していないので値は変わらない
		expect(result.current).toBe("test value");

		// さらに500ms経過（合計1000ms）
		act(() => {
			vi.advanceTimersByTime(500);
		});

		// 合計1000msが経過したので値が更新される
		expect(result.current).toBe("test value");
	});
});
