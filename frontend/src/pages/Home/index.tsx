import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./index.css";
import About from "components/Home/About";
import Loading from "components/Loading";
import NetworkError from "pages/Error/NetworkError";
import { sendRequest } from "utils/request";
import { Location } from "types/Location";
// import { ThemeProvider, createTheme } from "@mui/material/styles";

console.log("TODO: Create custom theme color");
/* const theme = createTheme({
 *   palette: {
 *     primary: {
 *       main: "#00A0E5",
 *     },
 *   },
 * }); */
type Error = {
  message: string;
};

const Home = () => {
  const [error, setError] = useState<Error | null>();
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
  const [location, setLocation] = useState<Location | null>(null);
  useEffect(() => {
    getLocation();
  }, []);

  if (error) return <NetworkError error={error} />;
  if (location === null) return <Loading />;
  return (
    <Routes>
      <Route path="" element={<About location={location} />} />
    </Routes>
  );
};

export default Home;
