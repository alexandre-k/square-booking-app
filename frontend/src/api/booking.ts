import { sendRequest } from "utils/request";
import { convertMsToMins } from "utils/dateTime";
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
        appointmentSegments: selectedServices.map((service) => {
          return {
            // anyTeamMember: selectedMemberIds.length > 1,
            durationMinutes: convertMsToMins(service.duration),
            serviceVariationId: service.id,
            teamMemberId: selectedMemberIds[0],
            serviceVariationVersion: service.version,
          };
        }),
      },
    },
    jwt
  );
};
