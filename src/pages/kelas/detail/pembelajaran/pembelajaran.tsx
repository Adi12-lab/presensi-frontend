import { useState } from "react";
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

export type DataModal = {
  data?: PembelajaranComplete;
  editDeleteOperation: EditDeleteOperation;
};

function Pembelajaran() {
  const [openModal, setOpenModal] = useState(false);
  const [dataModal, setDataModal] = useState<DataModal>({
    editDeleteOperation: "delete",
  });
  const { data } = useQuery<PembelajaranComplete[]>({
    queryKey: ["pembelajaran"],
    queryFn: ServicePembelajaran.all,
  });

  const table = useReactTable({
    columns: getTableColums(setDataModal, setOpenModal),
    data: data as PembelajaranComplete[],
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    data && (
      <div>
        <h2>Pembelajaran</h2>
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
            {table.getRowModel().rows.map((row) => (
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
          operation="delete"
          setIsOpen={setOpenModal}
        />
      </div>
    )
  );
}

export default Pembelajaran;
