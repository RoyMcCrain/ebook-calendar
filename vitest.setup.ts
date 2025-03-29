import { afterAll, beforeAll, vi } from 'vitest';

// 環境変数のモック設定
beforeAll(() => {
  // Vite環境変数のモック
  vi.stubEnv('VITE_KOBO_APP_ID', 'test-app-id');
  vi.stubEnv('VITE_KOBO_API_URL', 'https://api.example.com/books');
});

// テスト後に環境変数のモックをリセット
afterAll(() => {
  vi.unstubAllEnvs();
});
