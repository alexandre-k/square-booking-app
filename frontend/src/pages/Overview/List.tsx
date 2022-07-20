import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { useMagicLogin } from "context/MagicLoginProvider";
import IconButton from "@mui/material/IconButton";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
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
  const { isLoading: isAuthLoading, user, jwt } = useMagicLogin();

  const {
    isLoading: isLocationLoading,
    isError: isLocationError,
    location,
  } = useLocation();

  const getUserEmail = () => (!!user && user.email ? user.email : "");

  const { isLoading, isSuccess, isError, data, error } = useQuery<
    Array<Booking>,
    AxiosError
  >("customer/bookings", () => getBookingList(getUserEmail(), jwt), {
    enabled: !!jwt,
  });

  if (isLocationError) {
    return <div>Location error. Unable to retrieve current location</div>;
  }

  if (isLoading || isAuthLoading || isLocationLoading) {
    return <Loading />;
  }

  if (!jwt) {
    return <InviteLogin />;
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
            <Grid item xs={10} md={6} key={booking.id}>
              <Link
                to={"/overview/" + booking.id}
                style={{ textDecoration: "none" }}
              >
                <Card className="cardList">

                    <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
                    {booking.serviceNames.map((serviceName, idx) => <div>{(idx > 0) ? ' & ' + serviceName : '' + serviceName}</div>)}
                    </Typography>
                  <Stack direction="row" justifyContent="space-between">
                        <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>

                      <div>{date.format("dddd DD MMMM")}</div>
                      <div>{date.format("HH:mm")}</div>
                    </Typography>
                    <IconButton>
                      <ArrowForwardIosIcon />
                    </IconButton>
                  </Stack>
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
