import React, { useState, useEffect } from "react";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { Routes, Route } from "react-router-dom";
import "./index.css";
import About from "components/Home/About";
import Loading from "components/Loading";
import NetworkError from "pages/Error/NetworkError";
import { sendRequest } from "utils/request";
import { Location } from "types/Location";
import { getLocation } from "api/location";

type Error = {
  message: string;
};

const Home = () => {
    const { isLoading, isError, data, error } = useQuery<Location, AxiosError>("location", getLocation)

  if (error) return <NetworkError error={error} />;
  if (!data) return <Loading />;
  return (
    <Routes>
      <Route path="" element={<About location={data} />} />
    </Routes>
  );
};

export default Home;