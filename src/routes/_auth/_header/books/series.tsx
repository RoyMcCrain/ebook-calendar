import { ExternalLinkIcon } from "@radix-ui/react-icons";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import * as v from "valibot";
import { Button } from "#/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card";
import Pagination from "#/components/ui/pagination";
import queryOptions from "#/lib/queries/books/detail";

export const Route = createFileRoute("/_auth/_header/books/series")({
	component: RouteComponent,
	validateSearch: v.object({
		page: v.optional(v.fallback(v.number(), 1), 1),
		seriesName: v.optional(v.string(), ""),
	}),
	loaderDeps: ({ search: { page, seriesName } }) => ({
		page,
		seriesName,
	}),
	loader: ({ context: { queryClient }, deps: { page, seriesName } }) => {
		return queryClient.ensureQueryData(queryOptions({ seriesName, page }));
	},
});

function RouteComponent() {
	const { page, seriesName } = Route.useSearch();
	const navigate = Route.useNavigate();

	const { data, isLoading, error } = useQuery(
		queryOptions({ seriesName, page }),
	);

	const totalPages = data?.pageCount || 1;

	// ページ変更ハンドラー
	const handlePageChange = (newPage: number) => {
		navigate({
			search: { page: newPage },
		});
	};

	if (isLoading) return <div>読み込み中...</div>;
	if (error) return <div>エラーが発生しました</div>;

	return (
		<div className="grid gap-4 p-4">
			<div>
				<p className="font-bold">シリーズ名 </p>
				<p>{seriesName}</p>
			</div>

			<div className="grid grid-cols-[repeat(auto-fill,minmax(30rem,1fr))] gap-4">
				{data?.items.map((v) => (
					<Card key={v.itemNumber}>
						<CardHeader className="flex gap-2">
							<div className="flex flex-col items-center">
								<div className="w-[140px] rounded-xl">
									<img
										src={v.largeImageUrl}
										alt={v.title}
										className="rounded-xl object-contain"
									/>
								</div>
								<Button variant="link" className="p-3" asChild>
									<a href={v.itemUrl} target="_blank" rel="noopener noreferrer">
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
								<CardTitle>発売日</CardTitle>
								<p>{v.salesDate}</p>
							</div>
						</CardHeader>
						<CardContent className="grid gap-4">
							<CardTitle>内容紹介</CardTitle>
							<p>{v.itemCaption}</p>
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
