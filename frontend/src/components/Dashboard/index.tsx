import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { sendRequest } from "utils/request";
import dayjs from "dayjs";
import BookingsStats from "./BookingsStats";

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
      "/bookings?location_id=" + process.env.REACT_APP_SQUARE_LOCATION_ID,
      "GET"
    );
    return data.bookings;
  };

  // @ts-ignore
  const monthNums = [...Array(12).keys()];
  const months = monthNums.map((num) => {
    const now = dayjs();
    const date = dayjs(now.format("YYYY") + "-" + num);
    return date.format("MMM");
  });

  useEffect(() => {
    listAppointments().then((appointments) => {
      // @ts-ignore
      const appointmentsByMonth = appointments.reduce((acc, appointment) => {
        const month = dayjs(appointment.start_at).format("MMM");
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
