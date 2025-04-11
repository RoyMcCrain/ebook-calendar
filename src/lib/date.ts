import { format } from "date-fns";

export const formatToday = () => {
	const today = new Date();
	return format(today, "yyyy-MM-dd");
};

export const formatDate = (date: Date) => {
	return format(date, "yyyy-MM-dd");
};
