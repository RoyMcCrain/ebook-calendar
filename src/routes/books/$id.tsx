import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/books/$id")({
	component: RouteComponent,
});

function RouteComponent() {
	const { id } = Route.useParams();
	return <div>Hello "/books/$id"! {id}</div>;
}
