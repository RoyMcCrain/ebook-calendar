import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/list/detail")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/_auth/_layout/list/detail"!</div>;
}
