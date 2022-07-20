import { sendRequest } from "utils/request";
import { Service } from "types/Catalog";

export const getAvailabilities = async (
  selectedServices: Array<Service>,
  memberIds: Array<string>,
  startAt: string,
  endAt: string
) => {
  return await sendRequest("/booking/availability/search", "POST", {
    query: {
      filter: {
        locationId: process.env.REACT_APP_LOCATION_ID,
        startAtRange: {
          startAt,
          endAt,
        },
        segmentFilters: selectedServices.map((service: Service) => ({
          serviceVariationId: service.id,
          teamMemberIdFilter: {
            any: memberIds,
          },
        })),
      },
    },
  });
};
