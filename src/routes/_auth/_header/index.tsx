import { createFileRoute } from "@tanstack/react-router";
import Calendar from "#/components/calendar";

export const Route = createFileRoute("/_auth/_header/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <Calendar events={[]} />;
}
