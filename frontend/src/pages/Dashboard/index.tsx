import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { sendRequest } from "utils/request";
import dayjs from "dayjs";
import BookingsStats from "components/Dashboard/BookingsStats";
import { Booking } from "types/Booking";

type MonthlyAppointments = {
  month: string;
  appointments: number;
};

const TeamDashboard = () => {
  const [appointmentsByDate, setAppointmentsByDate] = useState<
    Array<MonthlyAppointments>
  >([]);

  const listAppointments = async () => {
    const data = await sendRequest(
      "/bookings?location_id=" + process.env.REACT_APP_LOCATION_ID,
      "GET"
    );
    return data.bookings;
  };

  const monthNums = Array.from(Array(12).keys());
  const months = monthNums.map((num) => {
    const now = dayjs();
    const date = dayjs(now.format("YYYY") + "-" + num);
    return date.format("MMM");
  });

  useEffect(() => {
    listAppointments().then((appointments) => {
      const appointmentsByMonth = appointments.reduce((acc: Record<string, number>, appointment: Booking) => {
        const month = dayjs(appointment.startAt).format("MMM");
        if (month in acc) {
          acc[month] += 1;
        } else {
          acc[month] = 1;
        }
        return acc;
      }, {});

      setAppointmentsByDate(
        months.map((month) => {
          const appointments = appointmentsByMonth[month]
            ? appointmentsByMonth[month]
            : 0;
          return { month, appointments };
        })
      );
    });
  }, [months]);
  return (
    <>
      <div>Stats</div>
      <Grid container alignItems="center" justifyContent="center">
        <Grid item xs={12} md={12}>
          <BookingsStats appointmentsByDate={appointmentsByDate} />
        </Grid>
      </Grid>
    </>
  );
};

export default TeamDashboard;
