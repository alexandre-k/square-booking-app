import React from "react";
import "react-calendar/dist/Calendar.css";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Stack from "@mui/material/Stack";
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
  <div id="timeContainer">
    <IconButton aria-label="left">
      <ChevronLeftIcon />
    </IconButton>
    <List
      style={{ width: "300px", overflowX: "scroll" }}
      component={Stack}
      direction="row"
    >
      {availabilities.map((availability) => {
        const startAt = localizedDate(availability.startAt, locationTimezone);
        return (
          <ListItem key={availability.startAt}>
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
          </ListItem>
        );
      })}
    </List>
    <IconButton aria-label="right">
      <ChevronRightIcon />
    </IconButton>
  </div>
);

export default TimeSelector;
