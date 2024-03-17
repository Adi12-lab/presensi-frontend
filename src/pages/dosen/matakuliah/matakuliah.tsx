import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { Search } from "lucide-react";
import Wrapper from "~/components/layout/wrapper";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { columns } from "./matakuliah-column";
import { Input } from "~/components/ui/input";

import ServiceMatakuliah from "~/actions/matakuliah";
import { Matakuliah as MatakuliahType } from "~/schema";

function Matakuliah() {
  const { data } = useQuery<MatakuliahType[]>({
    queryKey: ["matakuliah"],
    queryFn: ServiceMatakuliah.all,
  });

  const table = useReactTable({
    columns,
    data: data as MatakuliahType[],
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });
  return (
    <Wrapper>
      <div>
        <h1 className="font-bold bg-yellow-300 p-4 rounded-xl">
          Pilih Matakuliah
        </h1>
        <div className="relative mt-5">
          <Search className="absolute top-2.5 left-2" size={20} />
          <Input
            placeholder="Cari Matakuliah"
            value={(table.getColumn("nama")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("nama")?.setFilterValue(event.target.value)
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
                <TableRow
                  key={row.id}
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
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Matakuliah tidak ditemukan
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </Wrapper>
  );
}

export default Matakuliah;
