import React, { useEffect, useState } from "react";
import "react-calendar/dist/Calendar.css";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import Calendar from "react-calendar";
import dayjs from "dayjs";
import { DayOfWeek, LocationType, Period } from "types/Location";
import { getLocalDateWithTimezoneShift, localizedDate } from "utils/dateTime";
import Availabilities from "components/Booking/Availabilities";
import { useLocation } from "context/LocationProvider";
import NetworkError from "pages/Error/NetworkError";
import "./DateTimePicker.css";

interface TileDay {
  activeStartDate: Date;
  date: Date;
  view: string;
}

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

  const [value, onChange] = useState<Date>(
    getLocalDateWithTimezoneShift(selectedUTCStartAt, timezone)
  );
  const [date, setDate] = useState<dayjs.Dayjs>();
  const [endDate, setEndDate] = useState<dayjs.Dayjs>();
  const [workingDay, setWorkingDay] = useState<Period>();

  useEffect(() => {
    if (!!!endDate && !!selectedUTCStartAt && !!timezone)
      onDateSelected(
        getLocalDateWithTimezoneShift(selectedUTCStartAt, timezone)
      );
  });

  if (!!!location) return <div>No location found</div>;

  if (isLoading)
    return (
      <div id="bookingContainer">
        <Skeleton variant="rectangular" width="400px" height="300px" />
      </div>
    );

  if (isError && !!error) return <NetworkError error={error} />;

  const onDateSelected = async (value: Date) => {
    onChange(value);
    const [dayOfWeek] = value.toDateString().split(" ");
    setDate(dayjs(value));
    const foundWorkingDay = location.businessHours.periods.find(
      (obj: Period) => {
        return obj.dayOfWeek === dayOfWeek.toUpperCase();
      }
    );
    setWorkingDay(foundWorkingDay);
    if (foundWorkingDay === undefined) {
      console.log(
        "Unable to find a working day associated to the date selected"
      );
      return null;
    }
    if (selectedServices.length < 1) {
      console.log("No service variation selected");
      return;
    }
    setEndDate(dayjs(value).add(1, "day"));
    // const availabilities: Array<Availability> = location.availabilities;
    // setAvailabilities(availabilities);
  };

  const tileDisabled = ({ activeStartDate, date, view }: TileDay): boolean => {
    const now = dayjs();
    const dayjsDate = dayjs(date);
    if (now.diff(dayjsDate, "s") > 86400) return true;
    const dayOfWeek = dayjsDate.format("ddd").toUpperCase();
    const workingDays = location.businessHours.periods.map(
      (obj: Period) => obj.dayOfWeek
    );
    return !workingDays.includes(dayOfWeek as DayOfWeek);
  };

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
              setSelectedUTCStartAt(value.toISOString());
              onDateSelected(value);
            }}
            value={value}
            tileDisabled={tileDisabled}
          />
        </div>
      </Grid>
      {location && workingDay && memberIds && endDate && date && (
        <Grid item xs={12} md={6}>
          <div className="bookingContainer">
            <Availabilities
              selectedUTCStartAt={selectedUTCStartAt}
              setSelectedUTCStartAt={setSelectedUTCStartAt}
              selectedServices={selectedServices}
              memberIds={memberIds}
              endDate={endDate}
              workingDay={workingDay}
              date={date}
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
