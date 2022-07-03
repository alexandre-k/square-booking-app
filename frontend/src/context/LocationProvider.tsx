import React, { createContext, useContext, useEffect, useState } from "react";
import { AxiosError } from "axios";
import { Location } from "types/Location";
import { getLocation } from "api/location";

export interface LocationState {
  isLoading: boolean;
  isError: boolean;
  location?: Location | undefined;
  error?: AxiosError;
}

const initialContext = {
  isLoading: false,
  isError: false,
};

const StoreLocation = createContext<LocationState>(initialContext);

interface StoreLocationProviderProps {
  children?: React.ReactNode;
}

// const StoreLocationProvider = StoreLocation.Provider;

export const useLocation = () => useContext(StoreLocation);

const StoreLocationProvider = ({
  children,
}: StoreLocationProviderProps): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [location, setLocation] = useState<Location>();
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError>();

  useEffect(() => {
    if (!!!location) {
      setIsLoading(true);
      getLocation()
        .then((response: Location) => {
          setLocation(response);
          setIsError(false);
          setIsLoading(false);
        })
        .catch((error: AxiosError) => {
          setError(error);
          setIsError(true);
          setIsLoading(false);
        });
    }
  }, [location]);

  return (
    <StoreLocation.Provider value={{ isLoading, location, isError, error }}>
      {children}
    </StoreLocation.Provider>
  );
};

export default StoreLocationProvider;
