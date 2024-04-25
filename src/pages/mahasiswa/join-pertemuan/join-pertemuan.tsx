import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
function JoinPertemuan() {
  const [minute, setMinute] = useState("00:00");
  return (
    <div className="h-screen bg-purple-700 flex p-8 gap-x-8">
      <div className="w-2/3 bg-white rounded-3xl shadow-lg flex flex-col items-center justify-center gap-y-5">
        <div className="bg-yellow-300 p-6 border-4 border-red-400 shadow-md">
          <p className="text-7xl tracking-wider">{minute}</p>
        </div>
      </div>
      <div className="bg-white w-full rounded-3xl p-4 shadow-lg">
        <h2 className="font-bold bg-yellow-300 p-4 rounded-xl">
          Kehadiran Mahasiswa
        </h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Jam</TableHead>
              <TableHead>Presensi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default JoinPertemuan;
