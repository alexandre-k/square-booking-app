import dayjs from "dayjs";
import { Period } from "types/Location";
import { sendRequest } from "utils/request";

// @ts-ignore
export const getAvailabilities = async (
  selectedServices: Array<string>,
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
        segmentFilters: selectedServices.map((serviceId) => ({
          serviceVariationId: serviceId,
          teamMemberIdFilter: {
            any: memberIds,
          },
        })),
      },
    },
  });
};
