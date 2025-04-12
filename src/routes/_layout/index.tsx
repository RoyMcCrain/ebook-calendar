import { createFileRoute } from "@tanstack/react-router";
import Calendar from "#/components/calendar";

export const Route = createFileRoute("/_layout/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <Calendar events={[]} />;
}
