import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  getCoreRowModel,
  useReactTable,
  flexRender,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { columns } from "./pembelajaran-column";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "~/components/ui/table";
import ServicePembelajaran from "~/actions/pembelajaran";
import { PembelajaranComplete } from "~/schema";
import Wrapper from "~/components/layout/wrapper";
import { Button } from "~/components/ui/button";
type SemesterFilterType = {
  [key: string]: boolean;
};
function Pembelajaran() {
  const { data } = useQuery<PembelajaranComplete[]>({
    queryKey: ["matakuliah"],
    queryFn: async () => {
      return ServicePembelajaran.all();
    },
  });
  const [semesterFilter, setSemesterFilter] = useState<SemesterFilterType>({
    "1": true,
  });

  const table = useReactTable({
    columns,
    data: data as PembelajaranComplete[],
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  useEffect(() => {
    const semesterActive = Object.keys(
      Object.fromEntries(
        Object.entries(semesterFilter).filter(([_, value]) => value === true)
      )
    ).join(" ");
    if (data) {
      table.getColumn("semester")?.setFilterValue(semesterActive);
    }
  }, [semesterFilter, table, data]);

  return (
    <Wrapper>
      <div className="flex items-center justify-between mt-4">
        <h1 className="text-2xl font-bold">Pembelajaran</h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"outline"}>Semester</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-36">
            {[...Array(8)].map((_, index) => (
              <DropdownMenuCheckboxItem
                key={index}
                onCheckedChange={() => {
                  setSemesterFilter({
                    ...semesterFilter,
                    [`${index + 1}`]: !semesterFilter[`${index + 1}`],
                  });
                }}
                checked={semesterFilter[`${index + 1}`]}
              >
                Semester {index + 1}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Table className="mt-4">
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
          {data && table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
    </Wrapper>
  );
}

export default Pembelajaran;
