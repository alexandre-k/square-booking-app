import React, { useEffect, useState } from "react";
import "react-calendar/dist/Calendar.css";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import IconButton from '@mui/material/IconButton';
import Skeleton from "@mui/material/Skeleton";
import Calendar from "react-calendar";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Stack from "@mui/material/Stack";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { DayOfWeek, LocationType, Period } from "types/Location";
import { Availability } from "types/Booking";
import { sendRequest } from "utils/request";
import TimeSelector from "components/Booking/TimeSelector";
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
  selectedStartAt: string | null;
  setSelectedStartAt: (val: string) => void;
  selectedServices: Array<string>;
  memberId: string | null;
}

const DateTimePicker = (props: DateTimePickerProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [availabilities, setAvailabilities] = useState<Array<Availability>>([]);
  const [location, setLocation] = useState<Location | null>(null);
  const [value, onChange] = useState(new Date());
  const [businessHours, setBusinessHours] = useState<Array<Period>>([]);

  dayjs.extend(utc);
  dayjs.extend(timezone);
  const userTimeZone = dayjs.tz.guess();
  const getLocation = async () => {
    try {
      setLoading(true);
      const data = await sendRequest("/location", "GET");
      if (data === -1) return;
      setLocation(data);
      setBusinessHours(data.businessHours.periods);
    } catch (error: any) {
      // @ts-ignore
      setError(error.message);
      return;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (location === null) getLocation();
  });

  dayjs.tz.setDefault(userTimeZone);

  const onDateSelected = async (value: Date) => {
    onChange(value);

    const date = dayjs(value);
    if (date === undefined) {
      console.log("Date undefined");
      return;
    }
    const dayOfWeek = date.toString().substring(0, 3).toUpperCase();
    const workingDay = businessHours.find((obj) => obj.dayOfWeek === dayOfWeek);
    if (workingDay === undefined) {
      console.log(
        "Unable to find a working day associated to the date selected"
      );
      return null;
    }
    if (props.selectedServices.length < 1) {
      console.log("No service variation selected");
      return;
    }
    const endDate = dayjs(value).add(1, "day");

    const data = await sendRequest("/booking/availability/search", "POST", {
      query: {
        filter: {
          locationId: process.env.REACT_APP_SQUARE_LOCATION_ID,
          startAtRange: {
            endAt: `${endDate.year()}-${endDate.format("MM")}-${endDate.format(
              "DD"
            )}T${workingDay.startLocalTime}.607Z`,
            startAt: `${date.year()}-${date.format("MM")}-${date.format(
              "DD"
            )}T${workingDay.startLocalTime}.607Z`,
          },
          segmentFilters: [
            {
              serviceVariationId: props.selectedServices[0],
              teamMemberIdFilter: {
                any: [props.memberId],
              },
            },
          ],
        },
      },
    });
    const availabilities: Array<Availability> = data.availabilities;
    setAvailabilities(availabilities);
  };

  const tileDisabled = ({ activeStartDate, date, view }: TileDay): boolean => {
    const now = dayjs();
    const dayjsDate = dayjs(date);
    if (now.diff(dayjsDate, "s") > 86400) return true;
    const dayOfWeek = dayjsDate.format("ddd").toUpperCase();
    const workingDays = businessHours.map((obj) => obj.dayOfWeek);
    return !workingDays.includes(dayOfWeek as DayOfWeek);
  };

  if (loading)
    return (
      <div id="bookingContainer">
        <Skeleton variant="rectangular" width="400px" height="300px" />
      </div>
    );

  return (
    <div id="bookingContainer">
      <Calendar
        onChange={onDateSelected}
        value={value}
        tileDisabled={tileDisabled}
      />
      {availabilities && (
        <TimeSelector availabilities={availabilities} selectedStartAt={props.selectedStartAt} setSelectedStartAt={props.setSelectedStartAt} />
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
