import { Magic, MagicUserMetadata } from "magic-sdk";
import React, { createContext, useContext, useEffect, useState } from "react";

interface Error {
  message: string;
  err_code: string;
  status: number;
}

interface MagicLogin {
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string) => Promise<void>;
  logout: () => Promise<void>;
  error: Error | null;
  user: MagicUserMetadata;
  jwt: string;
}

const getMagicSingleton = (apiKey: string | undefined) =>
  new Magic(!!apiKey ? apiKey : "");

export const magicSingleton = getMagicSingleton(
  process.env.REACT_APP_UNBOXED_MAGIC_LINK_PUBLISHABLE_API_KEY
);

/* const initialContext = {
 *   isLoading: false,
 *   isAuthenticated: false,
 *   login: () => {},
 *   logout: () => {},
 *   error: "",
 *   user: {},
 * }; */

// const MagicLoginContext = createContext<MagicLogin>(initialContext);
const MagicLoginContext = createContext<MagicLogin>(undefined as any);

interface MagicLoginProviderProps {
  children?: React.ReactNode;
}

const MagicLoginProvider = ({
  children,
}: MagicLoginProviderProps): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [jwt, setJwt] = useState<string>(null as any);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<MagicUserMetadata>(undefined as any);
  const [error, setError] = useState<Error>(null as any);

  const login = async (email: string) => {
    setIsLoading(true);
    setError(null as any);
    try {
      const jwt = await magicSingleton.auth.loginWithMagicLink({
        email,
        showUI: false,
      });

      const metadata = await magicSingleton.user.getMetadata();
      if (jwt) setJwt(jwt);
      setUser(metadata);
      setIsLoading(false);
      setIsAuthenticated(true);
    } catch (err) {
      setError(err as any);
      setIsLoading(false);
    }
  };
  const logout = async () => {
    setIsLoading(true);
    setError(null as any);
    await magicSingleton.user.logout();
    setIsAuthenticated(false);
    setUser(null as any);
    setJwt(null as any);
    setIsLoading(false);
  };

  const getSavedMetadata = async () => {
    setIsLoading(true);
    try {
      const metadata = await magicSingleton.user.getMetadata();
      setUser(metadata);
      setIsAuthenticated(true);
      const jwt = await magicSingleton.user.getIdToken();
      setJwt(jwt);
    } catch (err) {
      setError(err as any);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated && !isLoading && !!!error) {
      getSavedMetadata();
    }
  });

  return (
    <MagicLoginContext.Provider
      value={{ isLoading, isAuthenticated, login, logout, error, user, jwt }}
    >
      {children}
    </MagicLoginContext.Provider>
  );
};

export default MagicLoginProvider;

export const useMagicLogin = () => useContext(MagicLoginContext);
