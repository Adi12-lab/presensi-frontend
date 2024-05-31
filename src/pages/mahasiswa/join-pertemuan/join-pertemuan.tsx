import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ArrowBigUp } from "lucide-react";

import { formatSeconds } from "~/lib/utils";
import { SocketContext } from "~/context/socket";
import { AuthContext } from "~/context/auth";
import { Button } from "~/components/ui/button";
function JoinPertemuan() {
  const { socket } = useContext(SocketContext);
  const { akun } = useContext(AuthContext);
  const { pertemuan } = useParams();
  // const [isCountdown, setIsCountdown] = useState(false);
  const [isPresence, setIsPresence] = useState(false);
  useEffect(() => {
    socket.emit("join-room", {
      id: Number(pertemuan),
      user: {
        ...akun,
      },
    });

    socket.on("countdown", (timer: number) => {
      // setIsCountdown(true);
      setMinute(formatSeconds(timer));
    });

    socket.on("countdown-end", () => {
      // setIsCountdown(false);
      setMinute(formatSeconds(0));
    });

    socket.on("is-presence", (data) => {
      setIsPresence(data);
    });

    return () => {
      socket.off("join-room");
      socket.off("presensi-active");
      socket.off("is-presence");
      socket.off("countdown");
      socket.off("countdown-end");
      socket.off("presensi-new");
    };
  }, [socket, pertemuan, akun]);

  const [minute, setMinute] = useState("00:00");
  const handlePresence = () => {
    socket.emit("presensi", {
      pertemuan_id: Number(pertemuan),
      nim: akun.username,
    });
    setIsPresence(true);
  };
  return (
    <div className="h-screen bg-purple-700 flex p-8 gap-x-8 justify-center">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-lg flex flex-col items-center justify-center gap-y-5">
        <div>
          <span className="text-lg font-bold">Status : </span>
          {isPresence ? (
            <span className="text-green-400 font-bold text-xl uppercase tracking-wider">
              PRESENCE
            </span>
          ) : (
            <span className="text-red-400 font-bold text-xl uppercase tracking-wider">
              NOT PRESENCE
            </span>
          )}
        </div>
        <div className="bg-yellow-300 p-6 border-4 border-red-400 shadow-md">
          <p className="text-7xl tracking-wider">{minute}</p>
        </div>
        <Button
          size={"lg"}
          className="uppercase text-2xl py-7 px-6"
          variant={"success"}
          onClick={handlePresence}
        >
          <ArrowBigUp size={40} />
          <span className="tracking-widest">Presence</span>
          <ArrowBigUp size={40} />
        </Button>
      </div>
    </div>
  );
}

export default JoinPertemuan;
