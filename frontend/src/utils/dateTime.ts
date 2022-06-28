import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
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

/**
 * Convert a duration in milliseconds to minutes
 *
 * @param {*} duration - duration in milliseconds
 * @returns {Number} - duration in minutes
 */
export const convertMsToMins = (duration: number) => {
    return Math.round(Number(duration) / 1000 / 60);
}

/**
 * Localize a time to the given timezone
 *
 * @param {*} utcDate - A date in UTC format
 * @param {*} timezone - A timezone
 * @returns {localizedDate} - Localized date
 */
export const localizedDate = (utcDate: string, tz: string) => {
    dayjs.extend(utc)
    dayjs.extend(timezone)
    return dayjs(utcDate).tz(tz);
}
