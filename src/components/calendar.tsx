import type { EventSourceInput } from "@fullcalendar/core";
import jaLocale from "@fullcalendar/core/locales/ja";
import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";

type Props = {
	events: EventSourceInput;
};

export default function Calendar({ events }: Props) {
	return (
		<FullCalendar
			plugins={[dayGridPlugin]}
			locales={[jaLocale]}
			initialView="dayGridMonth"
			locale="ja"
			events={events}
		/>
	);
}
