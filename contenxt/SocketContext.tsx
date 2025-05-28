// context/socket.context.tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

type SocketContextType = {
  socket: Socket | null;
  isConnected: boolean;
};

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
});

export const useSocket = () => {
  return useContext(SocketContext);
};

const SOCKET_URL = process.env.NEXT_SOCKET_URL;

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Initialize the socket client
    const socketInstance = io("http://104.236.194.254:9420", {
      auth: { token: localStorage.getItem("accessToken") },
    });

    socketInstance.on("connect", () => {
      // console.log("Connected to the server");
      setIsConnected(true);
    });

    socketInstance.on("disconnect", () => {
      // console.log("Disconnected from the server");
      setIsConnected(false);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};
