import React from "react";
import "react-calendar/dist/Calendar.css";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Availability } from "types/Booking";
import { localizedDate } from "utils/dateTime";
import "./TimeSelector.css";

interface TimeSelectorProps {
  availabilities: Array<Availability>;
  locationTimezone: string;
  selectedStartAt: string;
  setSelectedStartAt: (selectedStartAt: string) => void;
}
const TimeSelector = ({
  availabilities,
  locationTimezone,
  selectedStartAt,
  setSelectedStartAt,
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
                availability.startAt === selectedStartAt
                  ? "contained"
                  : "outlined"
              }
              onClick={() => {
                setSelectedStartAt(availability.startAt);
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
