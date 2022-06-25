import React, { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import "react-calendar/dist/Calendar.css";
import Skeleton from "@mui/material/Skeleton";
import Calendar from "react-calendar";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { DayOfWeek, Location, LocationType, Period } from "types/Location";
import { Availability } from "types/Booking";
import TimeSelector from "components/Booking/TimeSelector";
import Availabilities from "components/Booking/Availabilities";
import { getLocation } from "api/location";
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
  sellerNote?: string;
  startAt?: string;
  selectedStartAt: string;
  setSelectedStartAt: (val: string) => void;
  selectedServices: Array<string>;
  memberId: string | null;
}

const DateTimePicker = ({
  customerId,
  appointmentSegments,
  customerNote,
  locationType,
  sellerNote,
  startAt,
  selectedStartAt,
  setSelectedStartAt,
  selectedServices,
  memberId,
}: DateTimePickerProps) => {
  // const [availabilities, setAvailabilities] = useState<Array<Availability>>([]);
  const [location, setLocation] = useState<Location | null>(null);
  const [value, onChange] = useState(new Date());

  // const [selectedStartAt, setSelectedStartAt] = useState<string | null>(null);
  // const [businessHours, setBusinessHours] = useState<Array<Period>>([]);
  const { isLoading, isError, data, error } = useQuery<Location, AxiosError>(
    "location",
    getLocation
  );

  const [date, setDate] = useState<dayjs.Dayjs>();
  const [endDate, setEndDate] = useState<dayjs.Dayjs>();
  const [workingDay, setWorkingDay] = useState<Period>();

  if (!data) return <div>No data</div>;

  if (isLoading)
    return (
      <div id="bookingContainer">
        <Skeleton variant="rectangular" width="400px" height="300px" />
      </div>
    );

  if (isError) return <div>Error while loading</div>;

  const onDateSelected = async (value: Date) => {
    onChange(value);
    const [dayOfWeek, rest] = value.toDateString().split(" ");
    setDate(dayjs(value));
    const foundWorkingDay = data.businessHours.periods.find((obj: Period) => {
      return obj.dayOfWeek === dayOfWeek.toUpperCase();
    });
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
    // const availabilities: Array<Availability> = data.availabilities;
    // setAvailabilities(availabilities);
  };

  const tileDisabled = ({ activeStartDate, date, view }: TileDay): boolean => {
    const now = dayjs();
    const dayjsDate = dayjs(date);
    if (now.diff(dayjsDate, "s") > 86400) return true;
    const dayOfWeek = dayjsDate.format("ddd").toUpperCase();
    const workingDays = data.businessHours.periods.map(
      (obj: Period) => obj.dayOfWeek
    );
    return !workingDays.includes(dayOfWeek as DayOfWeek);
  };

  return (
    <div id="bookingContainer">
      <Calendar
        onChange={(value: Date) => onDateSelected(value)}
        value={value}
        tileDisabled={tileDisabled}
      />
      {data && workingDay && memberId && endDate && date && (
        <Availabilities
          selectedStartAt={selectedStartAt}
          setSelectedStartAt={setSelectedStartAt}
          selectedServices={selectedServices}
          memberId={memberId}
          endDate={endDate}
          workingDay={workingDay}
          date={date}
          locationTimezone={data.timezone}
        />
      )}
    </div>
  );
};

DateTimePicker.defaultProps = {
  customerId: "",
  locationType: "",
  startAt: "",
  sellerNote: "Seller note!",
  selectedServices: [],
  memberId: null,
};

export default DateTimePicker;
