// import * as Square from '@square/web-sdk';
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Footer from "components/Home/Footer";
import Completed from "components/Appointment/Completed";
// import ListBookings from "components/ListBookings";
import EnvironmentError from "EnvironmentError";
import NetworkError from "NetworkError";
import Home from "components/Home";
import Login from "components/Auth/Login";
import Logout from "components/Auth/Logout";
import Profile from "components/Auth/Profile";
// import SquareCustomer from "components/SquareCustomer";
import SquareLocation from "components/Home/SquareLocation";
import Appointment from "components/Appointment";
import TeamDashboard from "components/Dashboard";
import Loading from "components/Loading";
import BookingSummary from "components/Appointment/BookingSummary";
import { sendRequest } from "utils/request";
import { Location } from "types/Location";
import { Booking } from "types/Booking";
import "./App.css";
import Paper from "@mui/material/Paper";

type Error = {
  message: string;
};

function App() {
  // @ts-ignore
  const [location, setLocation] = useState<Location | null>(null);
  // @ts-ignore
  const [booking, setBooking] = useState<Booking>({});
  const [error, setError] = useState<Error | null>();
  const requiredEnv = [
    "REACT_APP_SQUARE_ACCESS_TOKEN",
    "REACT_APP_SQUARE_API_VERSION",
    "REACT_APP_SQUARE_ENVIRONMENT",
    "REACT_APP_SQUARE_LOCATION_ID",
  ];
  const undefinedVariables = requiredEnv.filter(
    (envVariable) =>
      process.env[envVariable] === undefined ||
      process.env[envVariable] === null ||
      process.env[envVariable] === ""
  );

  const getLocation = async () => {
    try {
      const data = await sendRequest("/location", "GET");
      if (data === -1) return;
      setLocation(data);
    } catch (error: any) {
      // @ts-ignore
      setError(error.message);
      return;
    }
  };

  const routes = ["home", "bookings", "appointment"];
  useEffect(() => {
    getLocation();
  }, []);

  if (undefinedVariables.length > 0)
    return <EnvironmentError variables={undefinedVariables} />;
  console.log("Error ", error);
  if (error) return <NetworkError error={error} />;
  if (location === null) return <Loading />;

  return (
    <Paper id="app" elevation={10}>
      <Grid
        id="rootGrid"
        container
        direction="row"
        justifyContent="space-between"
        alignItems="stretch"
      >
        <Grid item xs={12} md={12}>
          <AppBar color="transparent" position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Box sx={{ flexGrow: 1 }} />
              <Login />
            </Toolbar>
          </AppBar>
        </Grid>
        <Grid item xs={12} md={12}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home location={location} />} />
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/profile" element={<Profile />} />
              <Route
                path="/location"
                element={<SquareLocation location={location} />}
              />
              <Route
                path="/book"
                element={
                  <Appointment
                    businessHours={location.businessHours}
                    sendRequest={sendRequest}
                    booking={booking}
                    setBooking={setBooking}
                  />
                }
              />
              <Route
                path="completed"
                element={<Completed booking={booking} />}
              />
              <Route
                path="booking/summary"
                element={<BookingSummary booking={booking} />}
              />
              <Route path="dashboard" element={<TeamDashboard />} />
            </Routes>
          </BrowserRouter>
        </Grid>
        <Grid item xs={12} md={12}>
          <Footer routes={routes} />
        </Grid>
      </Grid>
    </Paper>
  );
}

export default App;
