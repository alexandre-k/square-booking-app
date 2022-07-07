import { sendRequest } from "utils/request";
import { ShortAppointmentSegment, Booking } from "types/Booking";

export const getBooking = async (bookingId: string, jwt: string) => {
  return await sendRequest("/customer/booking/" + bookingId, "GET", {}, jwt);
};

export const getBookingList = async (email: string, jwt: string) => {
  return await sendRequest("/customer/booking?email=" + email, "GET", {}, jwt);
};

export const cancelBooking = async (bookingId: string, jwt: string) => {
  return await sendRequest("/customer/booking/" + bookingId, "DELETE", jwt);
};

export const updateAppointmentSegments = async (
  booking: Booking | null,
  appointmentSegments: Array<ShortAppointmentSegment>,
  jwt: string
) => {
  if (booking === null) throw new Error("Booking not available");
  return await sendRequest(
    "/customer/booking/" + booking.id,
    "PUT",
    {
      booking: {
        customerId: booking.customerId,
        locationId: booking.locationId,
        locationType: booking.locationType,
        appointmentSegments,
        sellerNote: booking.sellerNote,
        startAt: booking.startAt,
        version: booking.version,
        customerNote: booking.customerNote,
      },
    },
    jwt
  );
};
