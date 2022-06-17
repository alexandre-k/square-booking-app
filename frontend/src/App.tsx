// import * as Square from '@square/web-sdk';
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Completed from "components/Appointment/Completed";
// import ListBookings from "components/ListBookings";
import EnvironmentError from "EnvironmentError";
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
import { TeamMember } from "types/Team";
import { CatalogObject } from "types/Catalog";

function App() {
  // @ts-ignore
  const [location, setLocation] = useState<Location | null>(null);
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [catalogObjects, setCatalogObjects] = useState<CatalogObject[]>([]);
  // @ts-ignore
  const [booking, setBooking] = useState<Booking>({});
  const requiredEnv = [
    "REACT_APP_SQUARE_ACCESS_TOKEN",
    "REACT_APP_SQUARE_API_VERSION",
    "REACT_APP_SQUARE_ENVIRONMENT",
    "REACT_APP_SQUARE_LOCATION_ID",
  ];
  const undefinedVariables = requiredEnv.filter(envVariable => process.env[envVariable] === undefined || process.env[envVariable] === null || process.env[envVariable] === "");

  const getTeamMembers = async () => {
    const data = await sendRequest("/team-members/search", "POST");
    const members = data.team_members.map(
      (member: TeamMember, index: number) => {
        return {
          ...member,
          avatarUrl: `https://randomuser.me/api/portraits/women/${index}.jpg`,
        };
      }
    );
    setMembers(members);
  };

  const getLocation = async () => {
    const data = await sendRequest(
      "/locations/" + process.env.REACT_APP_SQUARE_LOCATION_ID,
      "GET"
    );
    setLocation(data.location);
  };

  const getCatalogObjects = async () => {
    const data = await sendRequest("/catalog/list", "GET");
    setCatalogObjects(data.objects);
  };

  useEffect(() => {
    getLocation();
    getTeamMembers();
    getCatalogObjects();
  }, []);

  if (undefinedVariables.length > 0) return <EnvironmentError variables={undefinedVariables}/>
  if (location === null) return <Loading />;

  return (
    <>
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
            path="book"
            element={
              <Appointment
                businessHours={location.business_hours}
                members={members}
                catalogObjects={catalogObjects}
                sendRequest={sendRequest}
                booking={booking}
                setBooking={setBooking}
              />
            }
          />
          <Route path="completed" element={<Completed booking={booking} />} />
          <Route
            path="booking/summary"
            element={<BookingSummary booking={booking} />}
          />
          <Route path="dashboard" element={<TeamDashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
