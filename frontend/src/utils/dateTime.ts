import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

export const formatTime = (time: string) => {
    dayjs.extend(customParseFormat);
    return dayjs(time, "HH:mm:ss").format("HH:mm");
};

export const formatDayOfWeek = (day: string) => {
    return day[0].toUpperCase() + day.slice(1).toLowerCase();
};

