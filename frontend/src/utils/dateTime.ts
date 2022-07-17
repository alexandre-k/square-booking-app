import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { AppointmentSegment } from "types/Booking";

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
};

/**
 * Localize a time to the given timezone
 *
 * @param {*} utcDate - A date in UTC format
 * @param {*} timezone - A timezone
 * @returns {dayjs.Dayjs} - Localized date
 */
export const localizedDate = (utcDate: string, tz: string) => {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  return dayjs(utcDate).tz(tz);
};

export const addAppointmentDuration = (
  date: dayjs.Dayjs,
  segments: Array<AppointmentSegment>
) => {
  const totalDuration = segments.reduce(
    (minutes, curr) => minutes + curr.durationMinutes,
    0
  );
  return date.add(totalDuration, "m");
};

export const getBrowserTimezone = () => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
};

export const getLocalDateWithTimezoneShift = (
  selectedStartAt: string | null,
  timezone: string
) => {
  if (!selectedStartAt) return new Date();
  if (getBrowserTimezone() === timezone) return new Date(selectedStartAt);
  const tzStartDate = localizedDate(selectedStartAt, timezone);
  const startDate = dayjs(selectedStartAt);
  if (startDate.date() !== tzStartDate.date()) {
    const diffDate = startDate.date(
      tzStartDate.date() > startDate.date()
        ? startDate.date() + 1
        : startDate.date() - 1
    );
    return diffDate.toDate();
  }
  return startDate.toDate();
};

export const getTime = (utcDate: string | null, timezone: string) => {
    const date = localizedDate(!!utcDate ? utcDate : new Date().toISOString(), timezone);
    return date.format('hh:mm');
}


export const changeUTCTime = (targetUTCDate: string | null, fromUTCDate: string, timezone: string) => {
    const fromDate = localizedDate(fromUTCDate, timezone);
    const targetDate = localizedDate(!!targetUTCDate ? targetUTCDate : new Date().toISOString(), timezone);
    const newDate = targetDate.hour(fromDate.hour()).minute(fromDate.minute())
    return newDate.toISOString();
}
