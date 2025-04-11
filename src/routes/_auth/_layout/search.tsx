import { ExternalLinkIcon, Link2Icon } from "@radix-ui/react-icons";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import * as v from "valibot";
import { Button } from "#/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card";
import { Input } from "#/components/ui/input";
import Pagination from "#/components/ui/pagination";
import { useDebounce } from "#/hooks/useDebounce";
import queryOptions from "#/lib/queries/books/list";

export const Route = createFileRoute("/_auth/_layout/search")({
	component: RouteComponent,
	validateSearch: v.object({
		page: v.optional(v.fallback(v.number(), 1), 1),
		keyword: v.optional(v.string(), ""),
	}),
	loaderDeps: ({ search: { page, keyword } }) => ({ page, keyword }),
	loader: ({ context: { queryClient }, deps: { page, keyword } }) => {
		if (keyword === "") {
			return;
		}
		return queryClient.ensureQueryData(queryOptions({ page, keyword }));
	},
});

function RouteComponent() {
	const { page, keyword = "" } = Route.useSearch();
	const navigate = Route.useNavigate();
	const [searchKeyword, setSearchKeyword] = useState(keyword);
	const debouncedKeyword = useDebounce(searchKeyword, 2000); // デバウンスフックを使用

	// debouncedKeywordが変わったらページネーションをリセットして検索
	useEffect(() => {
		// 初回レンダリング時とURLのkeywordと同じ時は検索しない
		if (debouncedKeyword !== keyword) {
			navigate({
				search: { page: 1, keyword: debouncedKeyword },
			});
		}
	}, [debouncedKeyword, navigate, keyword]);

	const { data, isLoading, error } = useQuery(
		queryOptions({
			enabled: debouncedKeyword !== "",
			page,
			keyword: debouncedKeyword,
		}),
	);

	const totalPages = data?.pageCount || 1;

	// ページ変更ハンドラー
	const handlePageChange = (newPage: number) => {
		navigate({
			search: { page: newPage, keyword },
		});
	};

	// 入力が変更されたときのハンドラー
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchKeyword(e.target.value);
	};

	if (isLoading) return <div>読み込み中...</div>;
	if (error) return <div>エラーが発生しました</div>;
	return (
		<div className="grid gap-4 p-4">
			{/* 検索フォームをシンプルな入力欄に変更 */}
			<div>
				<Input
					type="text"
					value={searchKeyword}
					onChange={handleInputChange}
					placeholder="キーワードで検索"
					className="w-full"
				/>
			</div>
			<div className="grid grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] gap-4">
				{data?.items.map((v) => (
					<Card key={v.itemNumber}>
						<CardHeader className="flex flex-col">
							<CardTitle>シリーズ名</CardTitle>
							<Button
								variant="link"
								onClick={() => {
									navigate({
										to: "/books/series",
										search: {
											seriesName: v.seriesName,
										},
									});
								}}
							>
								<Link2Icon className="h-4 w-4" />
								{v.seriesName}
							</Button>
						</CardHeader>
						<CardContent>
							<div className="flex gap-2">
								<div className="flex flex-col items-center">
									<div className="w-[140px] rounded-xl">
										<img
											src={v.largeImageUrl}
											alt={v.title}
											className="rounded-xl object-contain"
										/>
									</div>
									<Button variant="link" asChild>
										<a
											href={v.itemUrl}
											target="_blank"
											rel="noopener noreferrer"
										>
											kobo ストアへ
											<ExternalLinkIcon className="h-4 w-4" />
										</a>
									</Button>
								</div>
								<div className="grid gap-2">
									<CardTitle>タイトル</CardTitle>
									<p>{v.title}</p>
									<CardTitle>著者</CardTitle>
									<p>{v.author}</p>
								</div>
							</div>
						</CardContent>
					</Card>
				))}
			</div>

			{/* ページネーションコンポーネントの使用 */}
			<Pagination
				currentPage={page}
				totalPages={totalPages}
				onPageChange={handlePageChange}
			/>
		</div>
	);
}
