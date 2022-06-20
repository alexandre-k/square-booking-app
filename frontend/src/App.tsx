// import * as Square from '@square/web-sdk';
import React, { useEffect, useState } from "react";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Divider from "@mui/material/Divider";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import ViewAgendaIcon from "@mui/icons-material/ViewAgenda";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Footer from "components/Footer";
import "components/Footer/index.css";
import Completed from "pages/Booking/Completed";
// import ListBookings from "components/ListBookings";
import EnvironmentError from "pages/Error/EnvironmentError";
import NetworkError from "pages/Error/NetworkError";
import Home from "pages/Home";
import Login from "components/Auth/Login";
import Logout from "components/Auth/Logout";
import Profile from "pages/Auth/Profile";
// import SquareCustomer from "components/SquareCustomer";
import SquareLocation from "components/Home/SquareLocation";
import Booking from "pages/Booking";
import TeamDashboard from "pages/Dashboard";
import Loading from "components/Loading";
import BookingSummary from "pages/Overview";
import { sendRequest } from "utils/request";
import { Location } from "types/Location";
import { Booking as BookingT } from "types/Booking";
import "./App.css";
import Paper from "@mui/material/Paper";

type Error = {
  message: string;
};

function App() {
  const isMobile = window.innerWidth <= 500;
  // @ts-ignore
  const [location, setLocation] = useState<Location | null>(null);
  // @ts-ignore
  const [booking, setBooking] = useState<BookingT>({});
  const [error, setError] = useState<Error | null>();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
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
  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setIsMenuOpen(open);
    };

  const routes = ["home", "bookings", "appointment"];
  useEffect(() => {
    getLocation();
  }, []);

  const menuRoutes = [
    { to: "", name: "Home", icon: <HomeIcon /> },
    { to: "profile", name: "Account", icon: <AccountCircleIcon /> },
    { to: "booking/summary", name: "My Bookings", icon: <ViewAgendaIcon /> },
  ];

  const list = () => (
    <Box
      sx={{ width: "auto" }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {menuRoutes.map((route, index) => (
          <Link key={route.to} to={route.to} style={{ textDecoration: "none" }}>
            <ListItem key={route.name} disablePadding>
              <ListItemButton>
                <ListItemIcon>{route.icon}</ListItemIcon>
                <ListItemText primary={route.name} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        {["Access", "About"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon></ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  if (undefinedVariables.length > 0)
    return <EnvironmentError variables={undefinedVariables} />;
  console.log("Error ", error);
  if (error) return <NetworkError error={error} />;
  if (location === null) return <Loading />;

  return (
    <Paper id="app" elevation={10}>
      <div id="rootGrid">
        <div id="appBar">
          <AppBar color="transparent" position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={toggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>
              <Box sx={{ flexGrow: 1 }} />
              <Login />
            </Toolbar>
          </AppBar>
        </div>
        <div id="mainContent">
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
                  <Booking
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
              <Route path="booking/summary" element={<BookingSummary />} />
              <Route path="dashboard" element={<TeamDashboard />} />
            </Routes>
            <SwipeableDrawer
              anchor={isMobile ? "bottom" : "left"}
              open={isMenuOpen}
              onClose={toggleDrawer(false)}
              onOpen={toggleDrawer(true)}
            >
              {list()}
            </SwipeableDrawer>
          </BrowserRouter>
        </div>
        <div id="footer">
          <Divider />
          <Footer routes={routes} />
        </div>
      </div>
    </Paper>
  );
}

export default App;
