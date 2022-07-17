import React from "react";
import "react-calendar/dist/Calendar.css";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Availability } from "types/Booking";
import { changeUTCTime, getTime, localizedDate } from "utils/dateTime";
import "./TimeSelector.css";

interface TimeSelectorProps {
  availabilities: Array<Availability>;
  locationTimezone: string;
  selectedUTCStartAt: string | null;
  setSelectedUTCStartAt: (utcDate: string) => void;
}
const TimeSelector = ({
  availabilities,
  locationTimezone,
  selectedUTCStartAt,
  setSelectedUTCStartAt,
}: TimeSelectorProps) => (
  <Grid
    container
    justifyContent="start"
    spacing={2}
    alignItems="center"
    direction="row"
  >
    {availabilities.map((availability, idx) => {
      const startAt = localizedDate(availability.startAt, locationTimezone);
      return (
        <Grid item xs={3} md={3} key={idx}>
          <div className="timeContainer">
            <Button
              variant={
                getTime(availability.startAt, locationTimezone) ===
                getTime(selectedUTCStartAt, locationTimezone)
                  ? "contained"
                  : "outlined"
              }
              onClick={() => {
                setSelectedUTCStartAt(
                  changeUTCTime(
                    selectedUTCStartAt,
                    availability.startAt,
                    locationTimezone
                  )
                );
              }}
            >
              {startAt.format("HH:mm")}
            </Button>
          </div>
        </Grid>
      );
    })}
  </Grid>
);

export default TimeSelector;
