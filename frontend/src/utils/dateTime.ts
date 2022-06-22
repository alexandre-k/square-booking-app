import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

// interface TileDay {
//   activeStartDate: Date;
//   date: Date;
//   view: string;
// }

export const formatTime = (time: string) => {
  dayjs.extend(customParseFormat);
  return dayjs(time, "HH:mm:ss").format("HH:mm");
};

export const formatDayOfWeek = (day: string) => {
  return day[0].toUpperCase() + day.slice(1).toLowerCase();
};

// const tileDisabled = ({ activeStartDate, date, view }: TileDay): boolean => {
//   const now = dayjs();
//   const dayjsDate = dayjs(date);
//   if (now.diff(dayjsDate, "s") > 86400) return true;
//   const dayOfWeek = dayjsDate.format("ddd").toUpperCase();
//   const workingDays = businessHours.map((obj) => obj.dayOfWeek);
//   return !workingDays.includes(dayOfWeek as DayOfWeek);
// };
