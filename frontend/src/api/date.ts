import dayjs from "dayjs";
import { Service } from "types/Catalog";
import { Period } from "types/Location";
import { sendRequest } from "utils/request";

// @ts-ignore
export const getAvailabilities = async (
  selectedServices: Array<string>,
  memberId: string,
  endDate: dayjs.Dayjs,
  workingDay: Period,
  date: dayjs.Dayjs
) => {
  return await sendRequest("/booking/availability/search", "POST", {
    query: {
      filter: {
        locationId: process.env.REACT_APP_SQUARE_LOCATION_ID,
        startAtRange: {
          endAt: `${endDate.year()}-${endDate.format("MM")}-${endDate.format(
            "DD"
          )}T${workingDay.startLocalTime}.607Z`,
          startAt: `${date.year()}-${date.format("MM")}-${date.format("DD")}T${
            workingDay.startLocalTime
          }.607Z`,
        },
        segmentFilters: selectedServices.map(serviceId => ({
          serviceVariationId: serviceId,
          teamMemberIdFilter: {
            any: [memberId],
          },
        })),
      },
    },
  });
};
