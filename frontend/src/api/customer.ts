import { sendRequest } from "utils/request";
import { ShortAppointmentSegment, Booking } from "types/Booking";

export const getBooking = async (bookingId: string) => {
    return await sendRequest("/customer/booking/" + bookingId, "GET");
};

export const cancelBooking = async (bookingId: string) => {
    return await sendRequest("/customer/booking/" + bookingId, "DELETE");
};

export const updateAppointmentSegments = async (booking: Booking | null, appointmentSegments: Array<ShortAppointmentSegment>) => {
    if (booking === null) throw 'Booking not available';
    return await sendRequest("/booking/" + booking.id, "PUT", {
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
    });
  };
