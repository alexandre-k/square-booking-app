import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { DayOfWeek, Location, Period } from "types/Location";
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
 * @param {*} targetDate - A date to format to a different timezone
 * @param {*} timezone - A timezone
 * @returns {dayjs.Dayjs} - Localized date
 */
export const localizedDate = (targetDate: string, tz: string) => {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  return dayjs(targetDate).tz(tz);
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

/*
 * react-calendar is not timezone aware, hence the shift of dates to display it
 */
const doShift = (
  startDate: dayjs.Dayjs,
  tzStartDate: dayjs.Dayjs,
  shift: boolean
) => {
  if (shift) {
    const gotDate = startDate
      .date(tzStartDate.date())
      .month(tzStartDate.month())
      .year(tzStartDate.year());
    return gotDate;
  } else {
    return startDate
      .date(tzStartDate.date())
      .month(tzStartDate.month())
      .year(tzStartDate.year());
  }
};

export const getLocalDateWithTimezoneShift = (
  utcDate: string | null,
  timezone: string,
  shift: boolean = true
) => {
  if (!utcDate) return new Date();
  if (getBrowserTimezone() === timezone) return new Date(utcDate);
  const tzStartDate = localizedDate(utcDate, timezone);
  const startDate = dayjs(utcDate);
  if (startDate.date() !== tzStartDate.date()) {
    const diffDate = doShift(startDate, tzStartDate, shift);
    return diffDate.toDate();
  }
  return startDate.toDate();
};

export const getTime = (utcDate: string | null, timezone: string) => {
  const date = localizedDate(
    !!utcDate ? utcDate : new Date().toISOString(),
    timezone
  );
  return date.format("hh:mm");
};

export const setDateToTimezone = (
  fromUTCDate: string | null,
  toTimezone: string
) => {
  const fromDate = dayjs(fromUTCDate);
  const toDate = localizedDate(
    !!fromUTCDate ? fromUTCDate : new Date().toISOString(),
    toTimezone
  );
  return toDate
    .hour(fromDate.hour())
    .minute(fromDate.minute())
    .date(fromDate.date())
    .month(fromDate.month())
    .year(fromDate.year())
    .toISOString();
};

export const showDateFromTimezone = (utcDate: string | null, timezone: string) => {
    const fromDate = localizedDate(
        !!utcDate ? utcDate : new Date().toISOString(),
        timezone
    );
    const toDate = dayjs(utcDate);
    return toDate
        .date(fromDate.date())
        .month(fromDate.month())
        .year(fromDate.year())
        .toISOString();
}

export const setTimeToDate = (
    fromUTCTime: string | null,
    toUTCDate: string | null,
    timezone: string
) => {
    const fromUTCDate = localizedDate(fromUTCTime || new Date().toISOString(), timezone);
    const toUTCDateTime = localizedDate(toUTCDate || new Date().toISOString(), timezone);
    return toUTCDateTime
        .hour(fromUTCDate.hour())
        .minute(fromUTCDate.minute())
        .toISOString();
};

export const getWorkingDay = (
  utcDate: string | null,
  timezone: string,
  // workingDay: Period,
  when: "start" | "end" = "start"
) => {
  // const workingDayTime = getWorkingDayTime(workingDay);
  const tzDate = localizedDate(utcDate || new Date().toUTCString(), timezone);
  return when === "start"
    ? tzDate.hour(0).minute(0).toISOString()
    : dayjs(tzDate).hour(0).minute(0).add(24, "hour").toISOString();
};

export const getWorkingDayTime = (workingDay: Period) => {
  const { startLocalTime, endLocalTime } = workingDay;
  const start = startLocalTime.split(":");
  const end = endLocalTime.split(":");
  return {
    start: {
      hour: Number(start[0]),
      minute: Number(start[1]),
      second: Number(start[2]),
    },
    end: {
      hour: Number(end[0]),
      minute: Number(end[1]),
      second: Number(end[2]),
    },
  };
};

/* useEffect(() => {
 *   if (!!!endDate && !!selectedUTCStartAt && !!timezone)
 *     onDateSelected(
 *       getLocalDateWithTimezoneShift(selectedUTCStartAt, timezone)
 *     );
 * }, [selectedUTCStartAt]); */

export const findWorkingDay = (value: Date, location: Location) => {
  const [dayOfWeek] = value.toDateString().split(" ");
  // setDate(dayjs(value));
  const foundWorkingDay = location.businessHours.periods.find((obj: Period) => {
    return obj.dayOfWeek === dayOfWeek.toUpperCase();
  });
  return foundWorkingDay;
  /* if (foundWorkingDay === undefined) {
   *   console.log(
   *     "Unable to find a working day associated to the date selected"
   *   );
   *   return null;
   * } */
  /* if (selectedServices.length < 1) {
   *   console.log("No service variation selected");
   *   return;
   * } */
  // setEndDate(dayjs(value).add(1, "day"));
  // const availabilities: Array<Availability> = location.availabilities;
  // setAvailabilities(availabilities);
};

export interface TileDay {
  activeStartDate: Date;
  date: Date;
  view: string;
}

export const tileDisabled = (
  { activeStartDate, date, view }: TileDay,
  location: Location
): boolean => {
  const now = dayjs();
  const dayjsDate = dayjs(date);
  if (now.diff(dayjsDate, "s") > 86400) return true;
  const dayOfWeek = dayjsDate.format("ddd").toUpperCase();
  const workingDays = location.businessHours.periods.map(
    (obj: Period) => obj.dayOfWeek
  );
  return !workingDays.includes(dayOfWeek as DayOfWeek);
};
