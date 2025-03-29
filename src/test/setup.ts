import { setupServer } from "msw/node";
import { afterAll, afterEach, beforeAll } from "vitest";
// エイリアスを使用したインポート
import { handlers } from "#/test/mocks/handlers";

// MSWのサーバーをセットアップ
export const server = setupServer(...handlers);

// テスト開始前にMSWを起動
beforeAll(() => {
	// 環境変数のセットアップ
	import.meta.env.VITE_KOBO_APP_ID = "test-app-id";
	import.meta.env.VITE_KOBO_API_URL = "https://api.example.com";

	server.listen({ onUnhandledRequest: "error" });
});

// 各テスト後にハンドラーをリセット
afterEach(() => {
	server.resetHandlers();
});

// すべてのテスト終了後にサーバーをクローズ
afterAll(() => {
	server.close();
});
