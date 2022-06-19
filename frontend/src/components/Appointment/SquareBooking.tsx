import React, { useState } from "react";
import "react-calendar/dist/Calendar.css";
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
import "./SquareBooking.css";

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

interface BookingProps {
  customerId?: string;
  appointmentSegments?: Array<AppointmentSegment>;
  customerNote?: string;
  locationType?: LocationType;
  sellerNote?: string;
  startAt?: string;
  selectedStartAt: string | null;
  onSelectStartAt: (val: string) => void;
  selectedServices: Array<string>;
  memberId: string | null;
  businessHours: Array<Period>;
}

const SquareBooking = (props: BookingProps) => {
  const [availabilities, setAvailabilities] = useState<Array<Availability>>([]);
  const [value, onChange] = useState(new Date());
  dayjs.extend(utc);
  dayjs.extend(timezone);
  const userTimeZone = dayjs.tz.guess();

  dayjs.tz.setDefault(userTimeZone);

  const onDateSelected = async (value: Date) => {
    onChange(value);

    const date = dayjs(value);
    if (date === undefined) {
      console.log("Date undefined");
      return;
    }
    const dayOfWeek = date.toString().substring(0, 3).toUpperCase();
    const workingDay = props.businessHours.find(
      (obj) => obj.dayOfWeek === dayOfWeek
    );
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
    const workingDays = props.businessHours.map((obj) => obj.dayOfWeek);
    return !workingDays.includes(dayOfWeek as DayOfWeek);
  };

  return (
    <div id="bookingContainer">
      <Calendar
        onChange={onDateSelected}
        value={value}
        tileDisabled={tileDisabled}
      />
      {availabilities && (
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
                    availability.startAt === props.selectedStartAt
                      ? "contained"
                      : "outlined"
                  }
                  onClick={() => {
                    props.onSelectStartAt(availability.startAt);
                  }}
                >
                  {startAt.format("HH:mm")}
                </Button>
              </ListItem>
            );
          })}
        </List>
      )}
    </div>
  );
};

SquareBooking.defaultProps = {
  customerId: "",
  locationType: "",
  startAt: "",
  sellerNote: "Seller note!",
  selectedServices: [],
  memberId: null,
};

export default SquareBooking;
