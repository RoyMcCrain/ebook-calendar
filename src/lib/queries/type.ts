type GeneralInfo = {
	count: number; // 検索結果の総商品数
	page: number; // 現在のページ番号
	first: number; // ページ内商品始追番
	last: number; // ページ内商品終追番
	hits: number; // 1度に返却する商品数
	pageCount: number; // 総ページ数（最大100）
};

// 商品情報詳細
export type ItemDetail = {
	title: string; // 書籍タイトル
	titleKana?: string; // 書籍タイトル カナ（任意）
	subTitle?: string; // 書籍サブタイトル（任意）
	seriesName?: string; // 本のシリーズ名（任意）
	author: string; // 著者名
	authorKana?: string; // 著者名カナ（任意）
	publisherName: string; // 出版社名
	itemNumber: string; // 商品番号
	itemCaption: string; // 商品説明文
	salesDate: string; // 発売日（例：「YYYY年MM月DD日」）
	itemPrice: number; // 税込み販売価格
	itemUrl: string; // 商品URL（httpsではじまるURL）
	affiliateUrl?: string; // アフィリエイトURL（任意）
	smallImageUrl: string; // 商品画像URL (64x64ピクセル)
	mediumImageUrl: string; // 商品画像URL (128x128ピクセル)
	largeImageUrl: string; // 商品画像URL (200x200ピクセル)
	reviewCount: number; // レビュー件数
	reviewAverage: number; // レビュー平均値
};

// APIレスポンス全体の型定義
export type Response = {
	generalInfo: GeneralInfo;
	items: ItemDetail[];
	count: number; // 検索結果の総商品数
	page: number; // 現在のページ番号
	first: number; // ページ内商品始追番
	last: number; // ページ内商品終追番
	hits: number; // 1度に返却する商品数
	pageCount: number; // 総ページ数（最大100）
};
