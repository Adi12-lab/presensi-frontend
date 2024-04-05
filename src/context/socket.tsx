import { useEffect, useState, createContext } from "react";
import { Socket as SocketType } from "socket.io-client";
import { socket } from "~/lib/utils";

type SocketProviderType = {
  socket: SocketType;
  isConnected: boolean;
};

export const SocketContext = createContext<SocketProviderType>({
  socket,
  isConnected: false,
});

function SocketProvider({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => setIsConnected(true));
    return () => {
      socket.off("connect", () => setIsConnected(false));
    };
  }, []);
  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
}

export default SocketProvider;
