import React, { useEffect, useState } from "react";
import "react-calendar/dist/Calendar.css";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Stack from "@mui/material/Stack";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { DayOfWeek, LocationType, Period } from "types/Location";
import { Availability } from "types/Booking";
import "./TimeSelector.css";

interface TimeSelectorProps {
  availabilities: Array<Availability>;
  selectedStartAt: string | null;
  setSelectedStartAt: (selectedStartAt: string) => void;
}
const TimeSelector = ({
  availabilities,
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
        const startAt = dayjs(availability.startAt);
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
