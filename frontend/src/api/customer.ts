import { sendRequest } from "utils/request";
import { Booking } from "types/Booking";

export const getBooking = async (email: string) => {
    return await sendRequest("/customer/booking?email=" + email, "GET");
};

export const cancelBooking = async (bookingId: string) => {
    return await sendRequest("/customer/booking/" + bookingId, "DELETE");
};

export const updateBooking = async (booking: Booking, selectedMemberId: string) => {
    if (booking === null) return;
    return await sendRequest("/booking/" + booking.id, "PUT", {
      booking: {
        customerId: booking.customerId,
        locationId: booking.locationId,
        locationType: booking.locationType,
        appointmentSegments: booking.appointmentSegments.map((segment) => {
          const { intermissionMinutes, anyTeamMember, ...rest } = segment;
          return { ...rest, teamMemberId: selectedMemberId };
        }),
        /* appointmentSegments: [
         *   {
         *     teamMemberId: selectedMemberId,
         *     durationMinutes: durationMinutes,
         *     serviceVariationId: serviceVariationId,
         *     serviceVariationVersion: serviceVariationVersion,
         *   },
         * ], */
        sellerNote: booking.sellerNote,
        startAt: booking.startAt,
        version: booking.version,
        customerNote: booking.customerNote,
      },
    });
  };
