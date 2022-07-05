import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { useAuth0 } from "@auth0/auth0-react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Loading from "components/Loading";
import { Booking } from "types/Booking";
import "./List.css";
import NetworkError from "pages/Error/NetworkError";
import NoBookingFound from "components/Overview/NoBookingFound";
import InviteLogin from "components/Auth/InviteLogin";
import { getBookingList } from "api/customer";
import { useLocation } from "context/LocationProvider";
import { localizedDate } from "utils/dateTime";

const BookingList = () => {
  const {
    isLoading: isAuthLoading,
    isAuthenticated,
    user,
  } = useAuth0<{ name: string }>();

  const {
    isLoading: isLocationLoading,
    isError: isLocationError,
    location,
  } = useLocation();

  const getUserName = () => (!!user ? user.name : "");

  const { isLoading, isSuccess, isError, data, error } = useQuery<
    Array<Booking>,
    AxiosError
  >("customer/bookings", () => getBookingList(getUserName()), {
    enabled: !!user,
  });

  if (isLocationError) {
    return <div>Location error. Unable to retrieve current location</div>;
  }

  if (!isAuthenticated && !isAuthLoading) {
    return <InviteLogin />;
  }

  if (isLoading || isAuthLoading || isLocationLoading) {
    return <Loading />;
  }

  if (isError && !!error) return <NetworkError error={error} />;

  if (isSuccess && !!location) {
    return (
      <Grid container spacing={2} columnSpacing={3}>
        <Grid item xs={12} md={12}>
          <Typography variant="h4" component="div" style={{ margin: "10px" }}>
            My bookings
          </Typography>
        </Grid>
        {data.map((booking: Booking) => {
          const date = localizedDate(booking.startAt, location.timezone);
          return (
            <Grid item xs={6} md={3} key={booking.id}>
              <Link
                to={"/overview/" + booking.id}
                style={{ textDecoration: "none" }}
              >
                <Card className="cardList">
                  {date.format("dddd DD MMMM") +
                    " | " +
                    date.format("hh:mm:ss")}
                </Card>
              </Link>
            </Grid>
          );
        })}
      </Grid>
    );
  }
  return <NoBookingFound title="No booking yet!" />;
};

export default BookingList;
