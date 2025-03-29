import type { FC } from "react";

// ページネーションコンポーネントのプロパティ定義
type Props = {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
};

// ページネーションコンポーネント
const Pagination: FC<Props> = ({ currentPage, totalPages, onPageChange }) => {
	// 最初のページに移動する関数
	const handleFirstPage = () => {
		onPageChange(1);
	};

	// 前のページに移動する関数
	const handlePrevPage = () => {
		if (currentPage > 1) {
			onPageChange(currentPage - 1);
		}
	};

	// 次のページに移動する関数
	const handleNextPage = () => {
		if (currentPage < totalPages) {
			onPageChange(currentPage + 1);
		}
	};

	// 最後のページに移動する関数
	const handleLastPage = () => {
		onPageChange(totalPages);
	};

	// 表示するページ番号を計算する関数（最大5つ）
	const getVisiblePageNumbers = () => {
		const pageNumbers = [];
		let startPage = Math.max(1, currentPage - 2);
		const endPage = Math.min(totalPages, startPage + 4);

		// 末尾に近い場合は、startPageを調整して5ページ表示できるようにする
		if (endPage - startPage < 4) {
			startPage = Math.max(1, endPage - 4);
		}

		for (let i = startPage; i <= endPage; i++) {
			pageNumbers.push(i);
		}

		return pageNumbers;
	};

	return (
		<div className="flex items-center justify-center gap-2 p-4">
			{/* 最初へボタン */}
			<button
				type="button"
				onClick={handleFirstPage}
				disabled={currentPage === 1}
				className="rounded bg-blue-500 px-3 py-2 text-white disabled:bg-gray-300"
			>
				最初へ
			</button>

			{/* 前へボタン */}
			<button
				type="button"
				onClick={handlePrevPage}
				disabled={currentPage === 1}
				className="rounded bg-blue-500 px-3 py-2 text-white disabled:bg-gray-300"
			>
				前へ
			</button>

			{/* ページ番号ボタン */}
			<div className="flex gap-1">
				{getVisiblePageNumbers().map((pageNum) => (
					<button
						key={pageNum}
						type="button"
						onClick={() => onPageChange(pageNum)}
						disabled={currentPage === pageNum}
						className={`h-9 w-9 rounded ${
							currentPage === pageNum
								? "bg-blue-700 text-white"
								: "bg-blue-500 text-white hover:bg-blue-600"
						}`}
					>
						{pageNum}
					</button>
				))}
			</div>

			{/* 次へボタン */}
			<button
				type="button"
				onClick={handleNextPage}
				disabled={currentPage >= totalPages}
				className="rounded bg-blue-500 px-3 py-2 text-white disabled:bg-gray-300"
			>
				次へ
			</button>

			{/* 最後へボタン */}
			<button
				type="button"
				onClick={handleLastPage}
				disabled={currentPage >= totalPages}
				className="rounded bg-blue-500 px-3 py-2 text-white disabled:bg-gray-300"
			>
				最後へ
			</button>

			{/* ページ数表示 */}
			<div className="ml-3 rounded bg-gray-100 px-3 py-2 text-gray-700">
				{currentPage} / {totalPages} ページ
			</div>
		</div>
	);
};

export default Pagination;
