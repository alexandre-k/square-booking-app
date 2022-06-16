import React, { useState } from "react";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Stack from "@mui/material/Stack";
import dayjs from "dayjs";
import { DayOfWeek, LocationType, Period } from "types/Location";
import { Availability } from "types/Booking";
import { sendRequest } from "utils/request";

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

  const onDateSelected = async (value: Date) => {
    onChange(value);

    const date = dayjs(value);
    if (date === undefined) {
      console.log("Date undefined");
      return;
    }
    const dayOfWeek = date.toString().substring(0, 3).toUpperCase();
    const workingDay = props.businessHours.find(
      (obj) => obj.day_of_week === dayOfWeek
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

    const data = await sendRequest("/bookings/availability/search", "POST", {
      query: {
        filter: {
          location_id: process.env.REACT_APP_SQUARE_LOCATION_ID,
          start_at_range: {
            end_at: `${endDate.year()}-${endDate.format("MM")}-${endDate.format(
              "DD"
            )}T${workingDay.start_local_time}.607Z`,
            start_at: `${date.year()}-${date.format("MM")}-${date.format(
              "DD"
            )}T${workingDay.start_local_time}.607Z`,
          },
          segment_filters: [
            {
              service_variation_id: props.selectedServices[0],
              team_member_id_filter: {
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
    const workingDays = props.businessHours.map((obj) => obj.day_of_week);
    return !workingDays.includes(dayOfWeek as DayOfWeek);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Calendar
          onChange={onDateSelected}
          value={value}
          tileDisabled={tileDisabled}
        />
      </div>
      <div>
        {availabilities && (
          <List
            style={{ overflowX: "scroll" }}
            component={Stack}
            direction="row"
          >
            {availabilities.map((availability) => {
              const startAt = dayjs(availability.start_at);
              return (
                <ListItem key={availability.start_at}>
                  <Button
                    variant={
                      availability.start_at === props.selectedStartAt
                        ? "contained"
                        : "outlined"
                    }
                    onClick={() => {
                      props.onSelectStartAt(availability.start_at);
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
    </>
  );
};

SquareBooking.defaultProps = {
  customerId: "F4J6AF1JM8RTQEWJ76ABKTV1G0",
  locationType: LocationType.CUSTOMER_LOCATION,
  startAt: "2022-07-08T15:00:00.607Z",
  sellerNote: "Seller note!",
  selectedServices: [],
  memberId: null,
};

export default SquareBooking;
