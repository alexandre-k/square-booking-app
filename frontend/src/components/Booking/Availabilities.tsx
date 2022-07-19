import React from "react";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import { AxiosError } from "axios";
import TimeSelector from "components/Booking/TimeSelector";
import { Availability } from "types/Booking";
import { getAvailabilities } from "api/date";
import { useQuery } from "react-query";

interface GetAvailabilitiesQuery {
  availabilities: Array<Availability>;
}

interface AvailabilitiesProps {
  selectedUTCStartAt: string | null;
  setSelectedUTCStartAt: (utcDate: string) => void;
  selectedServices: Array<string>;
  memberIds: Array<string>;
  startAt: string;
  endAt: string;
  locationTimezone: string;
}

const Availabilities = ({
  selectedUTCStartAt,
  setSelectedUTCStartAt,
  selectedServices,
  memberIds,
  startAt,
  endAt,
  locationTimezone,
}: AvailabilitiesProps) => {
  const { isLoading, data, error } = useQuery<
    GetAvailabilitiesQuery,
    AxiosError
  >(["availabilities"], () =>
    getAvailabilities(selectedServices, memberIds, startAt, endAt)
  );
  if (isLoading)
    return (
      <Grid container>
        {Array.from(Array(6).keys()).map((key) => (
          <Grid item xs={3} md={3} key={key}>
            <Skeleton variant="text" width="70px" height="50px" />
          </Grid>
        ))}
      </Grid>
    );

  if (!data || !data.availabilities) return <div>Data undefined</div>;

  return (
    // @ts-ignore
    <TimeSelector
      availabilities={data.availabilities}
      locationTimezone={locationTimezone}
      selectedUTCStartAt={selectedUTCStartAt}
      setSelectedUTCStartAt={setSelectedUTCStartAt}
    />
  );
};

export default Availabilities;
