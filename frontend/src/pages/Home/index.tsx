import React from "react";
import { Routes, Route } from "react-router-dom";
import "./index.css";
import About from "components/Home/About";
import { Location } from "types/Location";
// import { ThemeProvider, createTheme } from "@mui/material/styles";

interface HomeProps {
  location: Location;
}

console.log("TODO: Create custom theme color");
/* const theme = createTheme({
 *   palette: {
 *     primary: {
 *       main: "#00A0E5",
 *     },
 *   },
 * }); */

const Home = ({ location }: HomeProps) => {
  return (
    <Routes>
      <Route path="" element={<About location={location} />} />
    </Routes>
  );
};

export default Home;
