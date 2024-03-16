import { useContext, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  PaginationState,
} from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";

import { getTableColums } from "./anggota-column";
import ServiceMahasiswa from "~/actions/mahasiswa";

import { Button } from "~/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import AddAnggota from "./add-anggota";
import { EditDeleteOperation } from "~/type";
import { Mahasiswa } from "~/schema";
import { KelasContext } from "../detail-kelas";
import DeleteAnggota from "./delete-anggota";

export type DataModal = {
  data?: Mahasiswa;
  editDeleteOperation: EditDeleteOperation;
};

function Anggota() {
  const kelasKode = useContext(KelasContext);
  const [openModal, setOpenModal] = useState(false);
  const [dataModal, setDataModal] = useState<DataModal>({
    editDeleteOperation: "delete",
  });
  const mahasiswaData = useQuery<Mahasiswa[]>({
    queryKey: ["mahasiswa", "combobox"],
    queryFn: async () => {
      return await ServiceMahasiswa.all("noClass=true");
    },
  });

  const { data = [] } = useQuery<Mahasiswa[]>({
    queryKey: ["anggota"],
    queryFn: async () => {
      return await ServiceMahasiswa.all(`kelasKode=${kelasKode}`);
    },
    enabled: !!kelasKode,
  });

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 6,
  });

  const table = useReactTable({
    columns: getTableColums(setDataModal, setOpenModal),
    data: data as Mahasiswa[],
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
  });

  return (
    <>
      <AddAnggota mahasiswa={mahasiswaData.data as Mahasiswa[]} />
      <Table>
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
          {data &&
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>

      <div className="space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
      <DeleteAnggota
        data={dataModal.data as Mahasiswa}
        isOpen={openModal}
        operation={dataModal.editDeleteOperation}
        setIsOpen={setOpenModal}
      />
    </>
  );
}

export default Anggota;
