import { sendRequest } from "utils/request";
import { toAppointmentSegments } from "utils/service";
import { User } from "types/Customer";
import { Service } from "types/Catalog";

export const bookAppointment = async (
  customer: User,
  selectedUTCStartAt: string | null,
  selectedServices: Array<Service>,
  selectedMemberIds: Array<string>,
  jwt: string
) => {
  if (selectedUTCStartAt === null) throw Error("Start time not set!");
  return await sendRequest(
    "/customer/booking",
    "POST",
    {
      booking: {
        ...customer,
        customerNote: "",
        locationId: process.env.REACT_APP_LOCATION_ID,
        // locationType: LocationType.BUSINESS_LOCATION,
        // sellerNote: "",
        startAt: selectedUTCStartAt,
        appointmentSegments: toAppointmentSegments(
          selectedServices,
          selectedMemberIds
        ),
        services: selectedServices.map((s) => ({
          amount: s.price,
          id: s.id,
          currency: s.currency,
          name: s.name,
        })),
      },
    },
    jwt
  );
};
