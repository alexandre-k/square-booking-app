import { Magic, PromiEvent } from "magic-sdk";
import React, { createContext, useContext, useState } from "react";

interface Error {
  message: string;
}

export type User = {
  email: string;
  isMfaEnabled: boolean;
  issuer: string;
  phoneNumber: string | null;
  publicAddress: string;
};

interface MagicLogin {
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string) => Promise<void>;
  logout: () => Promise<void>;
  error: Error | null;
  user: User;
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
  const [user, setUser] = useState<User>(undefined as any);
  const [error, setError] = useState<Error>(null as any);

  const login = async (email: string) => {
    setIsLoading(true);
    try {
      const jwt = await magicSingleton.auth.loginWithMagicLink({
        email,
        showUI: false,
      });

      const user = await magicSingleton.user.getMetadata();

      setIsLoading(false);
      setIsAuthenticated(true);
    } catch (err) {
      setError({ message: err } as Error);
      setIsLoading(false);
    }
  };
  const logout = async () => {
    setIsLoading(true);
    await magicSingleton.user.logout();
    setIsAuthenticated(false);
    setUser(null as any);
    setJwt(null as any);
    setIsLoading(false);
  };

  return (
    <MagicLoginContext.Provider
      value={{ isLoading, isAuthenticated, login, logout, error, user }}
    >
      {children}
    </MagicLoginContext.Provider>
  );
};

export default MagicLoginProvider;

export const useMagicLogin = () => useContext(MagicLoginContext);
