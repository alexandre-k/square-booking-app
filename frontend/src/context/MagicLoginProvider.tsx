import { Magic, MagicUserMetadata, RPCError, RPCErrorCode } from "magic-sdk";
import React, { createContext, useContext, useEffect, useState } from "react";

interface Error {
  message: string;
  err_code: string;
  status: number;
}

interface MagicLogin {
  isLoading: boolean;
  hasSavedMetadata: boolean;
  isAuthenticated: boolean;
  login: (email: string) => Promise<{ jwt: string | null | undefined, metadata: MagicUserMetadata | null | undefined }>;
  logout: () => Promise<void>;
  error: Error | null;
  user: MagicUserMetadata;
  jwt: string;
}

const getMagicSingleton = (apiKey: string | undefined) => {
  try {
    return new Magic(!!apiKey ? apiKey : "");
  } catch {
    return null;
  }
};

const magicSingleton = getMagicSingleton(
  process.env.REACT_APP_PUBLISHABLE_API_KEY
);

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
  const [hasSavedMetadata, setHasSavedMetadata] = useState<boolean>(false);

  const login = async (email: string) => {
    setIsLoading(true);
    setError(null as any);
    try {
      const jwt = await magicSingleton?.auth.loginWithMagicLink({
        email,
        showUI: false,
      });

      const metadata = await magicSingleton?.user.getMetadata();
      if (jwt) setJwt(jwt);
      if (metadata) setUser(metadata);
      setIsLoading(false);
      setIsAuthenticated(true);
      return { jwt, metadata };
    } catch (err) {
      setError(err as any);
      setIsLoading(false);
      if (err instanceof RPCError) {
        switch (err.code) {
          case RPCErrorCode.MagicLinkFailedVerification:
          case RPCErrorCode.MagicLinkExpired:
          case RPCErrorCode.MagicLinkRateLimited:
          case RPCErrorCode.UserAlreadyLoggedIn:
            console.log("login fail: ", err, err.code);
            break;
        }
      }
      return { jwt: null, metadata: null };
    }
  };

  const logout = async () => {
    setIsLoading(true);
    setError(null as any);
    await magicSingleton?.user.logout();
    setIsAuthenticated(false);
    setUser(null as any);
    setJwt(null as any);
    setIsLoading(false);
  };

  const getSavedMetadata = async () => {
    try {
      const metadata = await magicSingleton?.user.getMetadata();
      if (metadata) setUser(metadata);
      setIsAuthenticated(true);
      const jwt = await magicSingleton?.user.getIdToken();
      if (jwt) setJwt(jwt);
      return !!jwt;
    } catch (err) {
      return false;
    }
  };

  const init = async () => {
    const found = await getSavedMetadata();
    setHasSavedMetadata(found);
  };

  useEffect(() => {
    if (!isAuthenticated && !hasSavedMetadata) {
      init();
    }

    if (isAuthenticated && user.email === null) {
      setIsAuthenticated(false);
    }
  });

  return (
    <MagicLoginContext.Provider
      value={{
        isLoading,
        hasSavedMetadata,
        isAuthenticated,
        login,
        logout,
        error,
        user,
        jwt,
      }}
    >
      {children}
    </MagicLoginContext.Provider>
  );
};

export default MagicLoginProvider;

export const useMagicLogin = () => useContext(MagicLoginContext);
