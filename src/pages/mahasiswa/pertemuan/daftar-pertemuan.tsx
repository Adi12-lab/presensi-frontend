import { Dispatch, SetStateAction, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";

import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "~/components/ui/table";
import ServicePertemuan from "~/actions/pertemuan";
import { getColumns } from "./pertemuan-column";
import { Pertemuan as PertemuanType, Presensi } from "~/schema";
import { Button } from "~/components/ui/button";
import { jenisPresensi } from "~/constant";
import { Dialog, DialogContent } from "~/components/ui/dialog";

export type DataModal = {
  isOpen: boolean;
  pertemuan: number;
};

function DaftarPertemuan({ pembelajaran }: { pembelajaran: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [pertemuan, setPertemuan] = useState(0);
  const { data = [] } = useQuery<PertemuanType[]>({
    queryKey: ["pertemuan", { pembelajaran }],
    queryFn: async () => {
      return await ServicePertemuan.all(`pembelajaran=${pembelajaran}`);
    },
    enabled: !!pembelajaran,
  });
  const table = useReactTable({
    data: data as PertemuanType[],
    columns: getColumns(setIsOpen, setPertemuan),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  return (
    <>
      <h2 className="font-bold text-xl">Daftar Pertemuan</h2>
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
      <PresensiDetail
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        pertemuan={pertemuan}
      />
    </>
  );
}

export default DaftarPertemuan;

export const PresensiDetail = ({
  pertemuan,
  isOpen,
  setIsOpen,
}: {
  pertemuan: number;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { data } = useQuery<{
    result: Presensi[];
    presentaseKehadiran: number;
  }>({
    queryKey: ["presensi", pertemuan],
  });
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <h3 className="font-bold text-lg">Daftar Presensi</h3>
        {data && (
          <Table>
            <TableHeader className="w-1/3">
              <TableRow>
                {data.result.map((pres) => (
                  <TableHead className="p-0">
                    <div className="border-r border-b border-black py-3 flex items-center justify-center">
                      {pres.jameKe}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                {data.result.map((prens) => (
                  <TableCell className="p-0">
                    <div className="border-r border-black py-3 flex items-center justify-center">
                      <Button
                        variant={jenisPresensi[prens.jenis].variant}
                        size={"icon"}
                        type="button"
                      >
                        {jenisPresensi[prens.jenis].label}
                      </Button>
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        )}
      </DialogContent>
    </Dialog>
  );
};
