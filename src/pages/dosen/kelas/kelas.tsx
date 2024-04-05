import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Search } from "lucide-react";
import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Input } from "~/components/ui/input";

import { Matakuliah } from "~/schema";
import ServiceMatakuliah from "~/actions/matakuliah";
import { columns, KelasProdi } from "./kelas-column";
import Wrapper from "~/components/layout/wrapper";

type MatakuliahKelas = Matakuliah & {
  kelas: KelasProdi[];
};

function Kelas() {
  const { matakuliah } = useParams();
  const { data } = useQuery<MatakuliahKelas>({
    queryKey: ["matakuliah", matakuliah],
    queryFn: async () => {
      return await ServiceMatakuliah.findByMatkul(matakuliah as string);
    },
    enabled: !!matakuliah,
    staleTime: 1000 * 5 * 60,
  });

  const table = useReactTable({
    columns,
    data: data?.kelas as KelasProdi[],
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    data && (
      <Wrapper>
        <h1 className="font-bold bg-yellow-300 p-4 rounded-xl">Pilih Kelas</h1>

        <div className="mt-7 text-center">
          <h2>Daftar Kelas Matakuliah</h2>
          <p className="uppercase font-bold">"{data.nama}"</p>
        </div>

        <div className="relative mt-5">
          <Search className="absolute top-2.5 left-2" size={20} />
          <Input
            placeholder="Cari Kelas"
            value={(table.getColumn("kelas")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("kelas")?.setFilterValue(event.target.value)
            }
            className="max-w-sm pl-10"
          />
        </div>
        <Table className="mt-5">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-black">
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
            {data && table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
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
                  colSpan={table.getRowCount()}
                  className="h-24 text-center"
                >
                  Kelas tidak ditemukan
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Wrapper>
    )
  );
}

export default Kelas;
