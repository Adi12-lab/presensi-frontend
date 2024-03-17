import { useContext, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";

import { getTableColums } from "./pembelajaran-column";
import ServicePembelajaran from "~/actions/pembelajaran";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import AddPembelajaran from "./add-pembelajaran";
import { PembelajaranComplete } from "~/schema";
import { EditDeleteOperation } from "~/type";

import DeletePembelajaran from "./delete-pembelajaran";
import { KelasContext } from "../detail-kelas";

export type DataModal = {
  data?: PembelajaranComplete;
  editDeleteOperation: EditDeleteOperation;
};

function Pembelajaran() {
  const kelasKode = useContext(KelasContext);
  const [openModal, setOpenModal] = useState(false);
  const [dataModal, setDataModal] = useState<DataModal>({
    editDeleteOperation: "delete",
  });
  const { data } = useQuery<PembelajaranComplete[]>({
    queryKey: ["pembelajaran"],
    queryFn: async () => {
      return await ServicePembelajaran.all(kelasKode as string);
    },
    enabled: !!kelasKode,
  });

  const table = useReactTable({
    columns: getTableColums(setDataModal, setOpenModal),
    data: data as PembelajaranComplete[],
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <AddPembelajaran />
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

      <DeletePembelajaran
        data={dataModal.data as PembelajaranComplete}
        isOpen={openModal}
        operation={dataModal.editDeleteOperation}
        setIsOpen={setOpenModal}
      />
    </>
  );
}

export default Pembelajaran;
