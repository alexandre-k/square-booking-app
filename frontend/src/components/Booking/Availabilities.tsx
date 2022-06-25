import React from "react";
import { AxiosError } from "axios";
import TimeSelector from "components/Booking/TimeSelector";
import { Availability } from "types/Booking";
import { getAvailabilities } from "api/date";
import { Period } from "types/Location";
import { useQuery } from "react-query";
import dayjs from "dayjs";

/* interface GetAvailabilitiesQuery {
 *     selectedStartAt: string;
 *     setSelectedStartAt: (selectedStartAt: string) => void;
 *     selectedServices: Array<string>;
 *     memberId: string;
 *     endDate: dayjs.Dayjs;
 *     workingDay: Period;
 *     date: dayjs.Dayjs;
 * } */

interface GetAvailabilitiesQuery {
  availabilities: Array<Availability>;
}

interface AvailabilitiesProps {
  selectedStartAt: string;
  setSelectedStartAt: (selectedStartAt: string) => void;
  selectedServices: Array<string>;
  memberId: string;
  endDate: dayjs.Dayjs;
  workingDay: Period;
  date: dayjs.Dayjs;
  locationTimezone: string;
}

const Availabilities = ({
  selectedStartAt,
  setSelectedStartAt,
  selectedServices,
  memberId,
  endDate,
  workingDay,
  date,
  locationTimezone
}: AvailabilitiesProps) => {
  // const [availabilities, setAvailabilities] = useState<Array<Availability>>([]);
  // @ts-ignore
  const { isLoading, isError, data, error } = useQuery<
    GetAvailabilitiesQuery,
    AxiosError
  >(["availabilities"], () =>
    getAvailabilities(selectedServices, memberId, endDate, workingDay, date)
  );
  if (!data || !data.availabilities) return <div>Data undefined</div>;
  return (
    // @ts-ignore
    <TimeSelector
      availabilities={data.availabilities}
      locationTimezone={locationTimezone}
      selectedStartAt={selectedStartAt}
      setSelectedStartAt={setSelectedStartAt}
    />
  );
};

export default Availabilities;
