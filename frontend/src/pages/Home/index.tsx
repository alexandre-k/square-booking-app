import React from "react";
import { Routes, Route } from "react-router-dom";
import "./index.css";
import About from "components/Home/About";
import Loading from "components/Loading";
import NetworkError from "pages/Error/NetworkError";
import { useLocation } from "context/LocationProvider";

const Home = () => {
  const { isLoading, isError, location, error } = useLocation();

  if (isError && !!error) return <NetworkError error={error} />;
  if (!location || isLoading) return <Loading />;
  return (
    <Routes>
      <Route path="" element={<About location={location} />} />
    </Routes>
  );
};

export default Home;
