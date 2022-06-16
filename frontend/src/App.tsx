// import * as Square from '@square/web-sdk';
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Completed from "components/Appointment/Completed";
// import ListBookings from "components/ListBookings";
import Home from "components/Home";
// import SquareCustomer from "components/SquareCustomer";
import SquareLocation from "components/Home/SquareLocation";
import Appointment from "components/Appointment";
import TeamDashboard from "components/Dashboard";
import { sendRequest } from "utils/request";
import { Location } from "types/Location";
import { Booking } from "types/Booking";
import { TeamMember } from "types/Team";
import { CatalogObject } from "types/Catalog";

function App() {
  // @ts-ignore
  const [location, setLocation] = useState<Location>({
    business_hours: { periods: [] },
  });
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [catalogObjects, setCatalogObjects] = useState<CatalogObject[]>([]);
  const [booking, setBooking] = useState<Booking|null>(null);

  const getTeamMembers = async () => {
    const data = await sendRequest({
      url: "/team-members/search",
      method: "POST",
      payload: {},
    });
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
    const data = await sendRequest({
      url: "/locations/" + process.env.REACT_APP_SQUARE_LOCATION_ID,
      method: "GET",
      payload: {},
    });
    setLocation(data.location);
  };

  const getCatalogObjects = async () => {
    const data = await sendRequest({
      url: "/catalog/list",
      method: "GET",
      payload: {},
    });
    setCatalogObjects(data.objects);
  };

  useEffect(() => {
    getLocation();
    getTeamMembers();
    getCatalogObjects();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home location={location} />} />
          <Route path="/location" element={<SquareLocation />} />
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
         <Route
            path="completed"
            element={<Completed booking={booking} />}
          />
          {/* <Route
              path="bookings"
              element={<ListBookings />}
              /> */}
          <Route path="dashboard" element={<TeamDashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
