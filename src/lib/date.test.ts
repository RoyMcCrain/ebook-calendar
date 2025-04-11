import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { formatDate, formatToday } from "./date";

describe("date", () => {
	describe("formatToday", () => {
		beforeEach(() => {
			vi.useFakeTimers();
			vi.setSystemTime(new Date(2023, 4, 15));
		});

		afterEach(() => {
			vi.useRealTimers();
		});

		it("今日の日付を「yyyy-MM-dd」形式で返すっス", () => {
			const result = formatToday();
			expect(result).toBe("2023-05-15");
		});
	});

	describe("formatDate", () => {
		it("指定した日付を「yyyy-MM-dd」形式で返すっス", () => {
			const testDate = new Date(2022, 11, 25); // 2022年12月25日
			const result = formatDate(testDate);
			expect(result).toBe("2022-12-25");
		});

		it("年の境界値（大晦日と元日）を正しくフォーマットするっス", () => {
			const newYearsEve = new Date(2022, 11, 31); // 2022年12月31日
			const newYearsDay = new Date(2023, 0, 1); // 2023年1月1日
			
			expect(formatDate(newYearsEve)).toBe("2022-12-31");
			expect(formatDate(newYearsDay)).toBe("2023-01-01");
		});

		it("月の境界値（月初と月末）を正しくフォーマットするっス", () => {
			const firstDayOfMonth = new Date(2023, 3, 1); // 2023年4月1日
			const lastDayOfMonth = new Date(2023, 3, 30); // 2023年4月30日
			
			expect(formatDate(firstDayOfMonth)).toBe("2023-04-01");
			expect(formatDate(lastDayOfMonth)).toBe("2023-04-30");
		});

		it("閏年の2月29日を正しくフォーマットするっス", () => {
			const leapYearDay = new Date(2024, 1, 29); // 2024年2月29日（閏年）
			
			expect(formatDate(leapYearDay)).toBe("2024-02-29");
		});
	});
});
