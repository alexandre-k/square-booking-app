import React, { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import "react-calendar/dist/Calendar.css";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import Calendar from "react-calendar";
import dayjs from "dayjs";
import { DayOfWeek, LocationType, Period } from "types/Location";
import {
  findWorkingDay,
  getWorkingDay,
  getBrowserTimezone,
  showDateFromTimezone,
  setDateToTimezone,
  TileDay,
  tileDisabled,
} from "utils/dateTime";
import Availabilities from "components/Booking/Availabilities";
import { useLocation } from "context/LocationProvider";
import NetworkError from "pages/Error/NetworkError";
import "./DateTimePicker.css";

interface AppointmentSegment {
  durationMinutes: number;
  serviceVariationId?: string;
  serviceVariationVersion?: string;
  teamMemberId?: string;
}

interface DateTimePickerProps {
  customerId?: string;
  appointmentSegments?: Array<AppointmentSegment>;
  customerNote?: string;
  locationType?: LocationType;
  timezone: string;
  sellerNote?: string;
  startAt?: string;
  selectedUTCStartAt: string | null;
  setSelectedUTCStartAt: (utcDate: string) => void;
  selectedServices: Array<string>;
  memberIds: Array<string>;
}

const DateTimePicker = ({
  customerId,
  appointmentSegments,
  customerNote,
  locationType,
  timezone,
  sellerNote,
  startAt,
  selectedUTCStartAt,
  setSelectedUTCStartAt,
  selectedServices,
  memberIds,
}: DateTimePickerProps) => {
  const { isLoading, isError, location, error } = useLocation();
  const queryClient = useQueryClient();

  if (!!!location) return <div>No location found</div>;

  if (isLoading)
    return (
      <div id="bookingContainer">
        <Skeleton variant="rectangular" width="400px" height="300px" />
      </div>
    );

  if (isError && !!error) return <NetworkError error={error} />;

  return (
    <Grid
      container
      direction="row"
      spacing={2}
      justifyContent="space-around"
      alignItems="center"
    >
      <Grid item xs={12} md={6}>
        <div className="bookingContainer">
          <Calendar
            onChange={(value: Date) => {
              const dateValue = setDateToTimezone(
                value.toISOString(),
                timezone
              );
              setSelectedUTCStartAt(dateValue);
              queryClient.invalidateQueries(["availabilities"]);
            }}
            value={
              new Date(
                showDateFromTimezone(selectedUTCStartAt, location.timezone)
              )
            }
            tileDisabled={({ activeStartDate, date, view }: TileDay) =>
              tileDisabled({ activeStartDate, date, view }, location)
            }
          />
        </div>
      </Grid>
      {location && memberIds && (
        <Grid item xs={12} md={6}>
          <div className="bookingContainer">
            <Availabilities
              selectedUTCStartAt={selectedUTCStartAt}
              setSelectedUTCStartAt={setSelectedUTCStartAt}
              selectedServices={selectedServices}
              memberIds={memberIds}
              startAt={getWorkingDay(
                selectedUTCStartAt || new Date().toUTCString(),
                timezone,
                "start"
              )}
              endAt={getWorkingDay(
                selectedUTCStartAt || new Date().toUTCString(),
                timezone,
                "end"
              )}
              locationTimezone={location.timezone}
            />
          </div>
        </Grid>
      )}
    </Grid>
  );
};

DateTimePicker.defaultProps = {
  customerId: "",
  locationType: "",
  startAt: "",
  sellerNote: "Seller note!",
  selectedServices: [],
  memberIds: [],
};

export default DateTimePicker;
