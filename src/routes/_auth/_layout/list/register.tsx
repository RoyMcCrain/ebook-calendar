import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/_layout/list/register")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/_auth/_layout/list/create"!</div>;
}
