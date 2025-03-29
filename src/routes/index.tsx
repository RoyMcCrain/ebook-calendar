import { useQuery } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";
import fetchBooks from "#/lib/queries/books";

export const Route = createFileRoute("/")({
	component: RouteComponent,
});

function RouteComponent() {
	const { data } = useQuery({
		queryKey: ["Books"],
		queryFn: fetchBooks,
	});
	return (
		<div>
			<h1>Welcome to the app!</h1>
			<p>
				<Link to="/books/list">Books List</Link>
			</p>
			<div className="grid grid-cols-2 gap-4 p-4">
				{data?.items.map((v) => (
					<div key={v.itemNumber} className="w-128 rounded-lg shadow-xl">
						<div className="flex flex-col items-center p-4">
							<a href={v.itemUrl} target="_blank" rel="noopener noreferrer">
								<div className="w-[180px] rounded-xl transition-shadow duration-300 hover:shadow-2xl">
									<img
										src={v.largeImageUrl}
										alt={v.title}
										className="h-64 rounded-xl object-contain"
									/>
								</div>
							</a>
						</div>
						<div className="p-4">
							<h2 className="font-bold">タイトル</h2>
							<p className="text-gray-600">{v.title}</p>
							<h2 className="font-bold">著者</h2>
							<p className="text-gray-600">{v.author}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
