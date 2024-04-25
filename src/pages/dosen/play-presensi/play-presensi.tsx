import { useContext, useEffect, useState } from "react";
import { Play } from "lucide-react";
import {
  getCoreRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import ServiceKelas from "~/actions/kelas";
import ServicePertemuan from "~/actions/pertemuan";
import { SocketContext } from "~/context/socket";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

import { Button } from "~/components/ui/button";
import { Mahasiswa, Pertemuan } from "~/schema";
import { getColumns } from "./kehadiran-column";
import { AuthContext } from "~/context/auth";
import { formatSeconds } from "~/lib/utils";

function PlayPresensi() {
  const { socket } = useContext(SocketContext);
  const { akun } = useContext(AuthContext);
  const { kelas } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const pertemuan = Number(searchParams.get("pertemuan"));
  const [minute, setMinute] = useState("00:00");
  const [isCountdown, setIsCountdown] = useState(false);

  const [rowSelection, setRowSelection] = useState({});
  const { data = [] } = useQuery<Mahasiswa[]>({
    queryKey: ["mahasiswa"],
    queryFn: async () => {
      return ServiceKelas.findAnggota(kelas as string);
    },
    staleTime: Infinity,
    enabled: !!kelas,
  });

  const pertemuanData = useQuery({
    queryKey: ["pertemuan"],
    queryFn: async () => {
      const result: Pertemuan = await ServicePertemuan.find(pertemuan);
      console.log(result)
      setMinute(
        formatSeconds(
          result.statusTimer !== "selesai" ? result.timerPresensi : 0
        )
      );
      return result;
    },
    staleTime: Infinity,
    enabled: !!pertemuan,
  });

  const table = useReactTable({
    columns: getColumns(socket, pertemuan, isCountdown),
    getRowId: (row) => row.nim,
    data: data as Mahasiswa[],
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
  });

  useEffect(() => {
    socket.emit("join-room", {
      id: pertemuan,
      user: {
        ...akun,
      },
    });

    socket.on("presensi-active", (presensiActive: Record<string, boolean>) => {
      setRowSelection(presensiActive);
    });

    socket.on("countdown", (timer: number) => {
      setIsCountdown(true);
      setMinute(formatSeconds(timer));
    });

    socket.on("countdown-end", () => {
      setIsCountdown(false);
    });

    socket.on("presensi-saved", () => {
      navigate(`/dosen/kelas/${kelas}/pertemuan/${pertemuan}`);
    });

    socket.on("presensi-new", (data) => {
      setRowSelection((prevRowSelection) => ({
        ...prevRowSelection,
        [data]: true,
      }));
    });

    return () => {
      socket.off("join-room");
      socket.off("presensi-active");
      socket.off("countdown");
      socket.off("countdown-end");
      socket.off("presensi-new");
    };
  }, [pertemuan, socket, akun, navigate]);

  const handleStartTimer = () => {
    setIsCountdown(true);
    socket.emit("start-timer", { pertemuan_id: pertemuan });
  };

  const handleStopTimer = () => {
    setIsCountdown(false);
    setMinute("00:00");
    socket.emit("stop-timer", { pertemuan_id: pertemuan });
  };

  return (
    pertemuanData.data && (
      <div className="h-screen flex bg-purple-700 p-8 gap-x-6">
        <div className="w-1/3 bg-white rounded-3xl shadow-lg flex flex-col items-center justify-center gap-y-5">
          <div className="bg-yellow-300 p-6 border-4 border-red-400 shadow-md">
            <p className="text-7xl tracking-wider">{minute}</p>
          </div>
          {!isCountdown && (
            <Button
              className="rounded-lg"
              size={"lg"}
              onClick={handleStartTimer}
            >
              <Play />
            </Button>
          )}
        </div>
        <div className="w-full flex flex-col bg-white rounded-3xl shadow-lg p-4">
          <h2 className="font-bold bg-yellow-300 p-4 rounded-xl">
            Daftar Kehadiran
          </h2>
          <Table className="mt-7">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="data-[state=selected]:bg-green-300 bg-red-300"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={table.getAllColumns().length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <div className="mt-auto ms-auto">
            <Button variant={"destructive"} onClick={handleStopTimer}>
              Simpan
            </Button>
          </div>
        </div>
      </div>
    )
  );
}

export default PlayPresensi;
