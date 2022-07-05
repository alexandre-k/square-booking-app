import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { AxiosError } from "axios";

interface ServerToClientEvents {
    "payment.updated": () => void;
    // "connection": () => void;
}

interface ClientToServerEvents {
    hello: () => void;
}

interface InterServerEvents {
    ping: () => void;
}

interface SocketData {
    name: string;
    age: number;
}

export interface WebSocket {
    isConnected: boolean;
    socket: Socket;
}

const initialContext = {
    isConnected: false,
    socket: io()
};

const WebSocketContext = createContext<WebSocket>(initialContext);

interface WebSocketProviderProps {
  children?: React.ReactNode;
}

export const useWebSocket = () => useContext(WebSocketContext);

const WebSocketProvider = ({
  children,
}: WebSocketProviderProps): JSX.Element => {
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const [socket, setSocket] = useState<Socket>(io());

  useEffect(() => {
      if (!socket) {
      const sock: Socket<ServerToClientEvents, ClientToServerEvents> = io();
      sock.on('connect', () => {
          setIsConnected(true);
      })
      setSocket(sock);
      }
  }, []);

  return (
    <WebSocketContext.Provider value={{ isConnected, socket }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export default WebSocketProvider;
