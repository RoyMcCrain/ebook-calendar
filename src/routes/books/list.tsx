import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/books/list")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/books/list"!</div>;
}
