import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import ViewAgendaIcon from "@mui/icons-material/ViewAgenda";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import EnvironmentError from "pages/Error/EnvironmentError";
import Home from "pages/Home";
import LoginButton from "components/Auth/LoginButton";
import Login from "components/Auth/Login";
import Logout from "components/Auth/Logout";
import Menu from "components/Home/Menu";
import Profile from "pages/Auth/Profile";
import Booking from "pages/Booking";
import TeamDashboard from "pages/Dashboard";
import BookingList from "pages/Overview/List";
import BookingSummary from "pages/Overview/Summary";
import { Booking as BookingT } from "types/Booking";
import { useMagicLogin } from "context/MagicLoginProvider";
import "./App.css";
import Paper from "@mui/material/Paper";

interface AppProps {
  isMenuOpenDefault: boolean;
}

function App({ isMenuOpenDefault }: AppProps) {
  const isMobile = window.innerWidth <= 500;
  const [booking, setBooking] = useState<BookingT>({} as any);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(isMenuOpenDefault);
  const { logout } = useMagicLogin();
  const requiredEnv = ["REACT_APP_LOCATION_ID"];
  const undefinedVariables = requiredEnv.filter(
    (envVariable) =>
      process.env[envVariable] === undefined ||
      process.env[envVariable] === null ||
      process.env[envVariable] === ""
  );

  
  const menuRoutes = [
    { to: "", name: "Home", icon: <HomeIcon /> },
    { to: "overview", name: "MyBookings", icon: <ViewAgendaIcon /> },
  ];

  if (undefinedVariables.length > 0)
    return <EnvironmentError variables={undefinedVariables} />;

  return (
    <Paper id="app" elevation={10}>
      <div id="rootGrid">
        <BrowserRouter>
          <div id="appBar">
            <AppBar color="transparent" position="static">
              <Toolbar role="toolbar">
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                  onClick={() => setIsMenuOpen(true)}
                >
                  <MenuIcon />
                </IconButton>
                <Box sx={{ flexGrow: 1 }} />
                <LoginButton
                  isAvatar={true}
                  onClick={() => setIsMenuOpen(true)}
                />
              </Toolbar>
            </AppBar>
          </div>
          <div id="mainContent" role="application">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/profile" element={<Profile />} />
              <Route
                path="/book"
                element={<Booking booking={booking} setBooking={setBooking} />}
              />
              <Route path="overview" element={<BookingList />} />
              <Route path="overview/:bookingId" element={<BookingSummary />} />
              <Route path="dashboard" element={<TeamDashboard />} />
            </Routes>
            <SwipeableDrawer
              role="menu"
              anchor={isMobile ? "bottom" : "left"}
              open={isMenuOpen}
              onClose={() => setIsMenuOpen(false)}
              onOpen={() => setIsMenuOpen(true)}
            >
              <Menu
                menuRoutes={menuRoutes}
                toggleDrawer={setIsMenuOpen}
                logout={logout}
              />
            </SwipeableDrawer>
          </div>
        </BrowserRouter>
      </div>
    </Paper>
  );
}

App.defaultProps = {
  isMenuOpenDefault: false,
};

export default App;
