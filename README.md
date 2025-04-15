# ebook-calendar

電子書籍（主に漫画）の新刊情報を検索・表示するためのウェブアプリケーションです。

## アプリケーション概要

ebook-calendarは、楽天Kobo APIを利用して漫画シリーズの発売日を管理するためのアプリケーションです。毎月多数の電子書籍（主に漫画）を購入するユーザーが、新刊の発売日を効率的に管理できるように設計されています。

### 主な機能

- マンガの検索機能
- マンガの登録と削除機能
- 登録したマンガの新刊情報をカレンダーに表示（Googleカレンダー連携）
- マンガの詳細ページから楽天Koboのページへの遷移
- ユーザー認証機能
- 毎月の新刊発売日のメール通知
- 発売日当日のメール通知

このアプリケーションは、従来のKindle向けのベルアラートのような機能をKobo電子書籍向けに提供し、新刊の発売を見逃さないようにしたいユーザーのために開発されています。

## 技術スタック

- React 19.0.0
- TypeScript
- Vite（ビルドツール）
- TanStack Router（ルーティング）
- TanStack Query（データフェッチング）
- Tailwind CSS（スタイリング）
- Clerk（認証）
- Vitest（テスト）
- Biome（リンティング・フォーマット）

## 開発ガイドライン

### 環境構築

1. リポジトリをクローン
2. 依存関係をインストール
   ```bash
   pnpm install
   ```
3. 環境変数を設定
   - `.env.local`ファイルを作成し、以下の変数を設定
     ```
     VITE_KOBO_API_URL=https://app.rakuten.co.jp/services/api/Kobo/EbookSearch/20170426
     VITE_KOBO_APP_ID=あなたの楽天アプリケーションID
     ```

### 開発コマンド

```bash
# 開発サーバーの起動（ポート3000）
pnpm dev

# プロダクションビルド
pnpm build

# テストの実行
pnpm test

# コードチェック
pnpm check
```

### コーディング規約

- コンポーネントはTypeScriptで記述
- ファイルベースのルーティングを使用
- データフェッチングにはTanStack Queryを使用
- UIコンポーネントはTailwind CSSでスタイリング
- コードはコミット前にコードチェックを実行

### ディレクトリ構造

```
src/
├── components/  # UIコンポーネント
├── hooks/       # カスタムフック
├── lib/         # ユーティリティと共通関数
│   └── queries/ # データフェッチング関連
├── routes/      # ルート定義（ファイルベース）
└── main.tsx     # エントリーポイント
```


## 主要機能の詳細

### 検索機能
- キーワードによる漫画タイトルの検索
- 検索結果は新刊順に表示（発売日管理に最適）
- 検索入力にはデバウンス処理を適用（2秒）

### 検索と登録機能
- キーワードによるマンガタイトルの検索
- 検索結果は新刊順に表示
- マンガシリーズの登録と削除が可能
- 検索入力にはデバウンス処理を適用（2秒）

### カレンダー連携
- 登録したマンガの新刊情報をカレンダーに表示
- Googleカレンダーとの連携機能
- 発売日情報を一目で確認可能

### 書籍情報表示
- 表紙画像
- タイトル
- 著者名
- シリーズ名
- 発売日情報
- 楽天Koboストアへの購入リンク

### 通知機能
- 毎月の新刊発売日をメールで通知
- 発売日当日にもメール通知
- 見逃しを防止する通知システム

## 貢献ガイドライン

### プルリクエスト
1. 新機能の追加や修正は新しいブランチで作業
2. コードはコミット前にコードチェックを実行
3. テストを追加または更新
4. プルリクエストには変更内容の詳細な説明を記載

### 機能追加時の注意点
- 既存のコンポーネント構造とスタイルに合わせる
- データフェッチングは`lib/queries`ディレクトリに追加
- 新しいルートは`routes`ディレクトリに追加
- UIコンポーネントは`components/ui`ディレクトリに追加

## ライセンス

このプロジェクトはMITライセンスの下で公開されています。

## 謝辞

このプロジェクトは[楽天Kobo API](https://webservice.rakuten.co.jp/api/koboebooksearch/)を使用しています。

## 認証機能

- ユーザー認証機能
- セキュアなユーザー管理
- 個人ごとのマンガ登録情報の保存

## 今後の開発計画

- モバイル対応の強化
- 通知設定のカスタマイズ機能
- 発売日予測機能の追加
- 複数のストアからの情報統合
