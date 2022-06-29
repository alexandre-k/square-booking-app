import { formatDayOfWeek, formatTime, convertMsToMins, localizedDate } from "./dateTime";

test("given a UTC date, time format on HH:mm format if valid", () => {
  expect(formatTime("2026")).toBe("Invalid Date");
  expect(formatTime("2022-03-16T01:59:01Z")).toBe("20:02");
});

test("give an uppercase word", () => {
    expect(formatDayOfWeek("monday")).toBe("Monday");
    expect(formatDayOfWeek("MON")).toBe("Mon");
    expect(formatDayOfWeek("mon")).toBe("Mon");
});

test("conversion from milliseconds to minutes", () => {
  expect(convertMsToMins(60000)).toBe(1);
  expect(convertMsToMins("wrong input")).toBeNaN();
});

test("given a date and a timezone, returns a localized date", () => {
  const date = "2022/06/29 00:00:00 GMT+0900";
  const timezone = "Asia/Tokyo";
  const expectedDate = "2022-06-28T15:00:00.000Z";
  expect(JSON.stringify(localizedDate(date, timezone))).toEqual(
    JSON.stringify(expectedDate)
  );
});
