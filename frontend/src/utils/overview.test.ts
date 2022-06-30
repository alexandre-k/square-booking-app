import { AppointmentSegment, BookingStatus } from "types/Booking";
import { editDialogTitle, isCancelled, shortenSegment } from "./overview";

test("Each edit dialog title to be adequate", () => {
  expect(editDialogTitle("date")).toBe("Set date and time");
  expect(editDialogTitle("service")).toBe("Add or remove a service");
  expect(editDialogTitle("member")).toBe("Set team member");
  expect(editDialogTitle("")).toBe("Title not set");
});

test("an appointment segment should have read-only properties removed", () => {
  const segment = {
    durationMinutes: 30,
    serviceVariationId: "AFY2WI3VNSLYP2IADUVK6DCQ",
    teamMemberId: "TMbwtPGv72uRGpvX",
    serviceVariationVersion: 1654470446165,
    anyTeamMember: false,
    intermissionMinutes: 0,
  };
  const segmentWithoutReadOnlyProperties = {
    durationMinutes: 30,
    serviceVariationId: "AFY2WI3VNSLYP2IADUVK6DCQ",
    teamMemberId: "TMbwtPGv72uRGpvX",
    serviceVariationVersion: 1654470446165,
  };
  expect(shortenSegment(segment)).toMatchObject(
    segmentWithoutReadOnlyProperties
  );
});

test("an accepted appointment is not cancelled", () => {
  expect(isCancelled(BookingStatus.ACCEPTED)).toBe(false);
  expect(isCancelled(BookingStatus.DECLINED)).toBe(true);
  expect(isCancelled(BookingStatus.CANCELLED_BY_CUSTOMER)).toBe(true);
});
