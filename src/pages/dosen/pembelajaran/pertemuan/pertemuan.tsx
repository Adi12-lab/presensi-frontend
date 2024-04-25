import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { PlusSquare } from "lucide-react";

import { getTableColumns } from "./pertemuan-column";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import ServicePertemuan from "~/actions/pertemuan";
import { Pertemuan as PertemuanType } from "~/schema";
import { Anchor } from "~/components/ui/anchor";
import DeletePertemuan from "./delete-pertemuan";
import { EditDeleteOperation } from "~/type";

export type DataModal = {
  data?: PertemuanType;
  operation: EditDeleteOperation;
};

interface PertemuanProps {
  pembelajaran: number;
  kelas: string;
}

function Pertemuan({ pembelajaran, kelas }: PertemuanProps) {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [dataModal, setDataModal] = useState<DataModal>({
    operation: "delete",
  });
  const { data = [] } = useQuery<PertemuanType[]>({
    queryKey: ["pertemuan", { pembelajaran }],
    queryFn: async () => {
      return await ServicePertemuan.all(`pembelajaran=${pembelajaran}`);
    },
    enabled: !!pembelajaran,
  });

  const table = useReactTable({
    data: data as PertemuanType[],
    columns: getTableColumns(kelas, setDataModal, setOpenDeleteModal),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <>
      <h2 className="font-bold text-lg">Detail Pertemuan</h2>
      <Anchor
        href={`/dosen/pembelajaran/${pembelajaran}/add-pertemuan`}
        variant={"secondary"}
        size="lg"
        className="text-lg mt-4 float-right"
      >
        <PlusSquare className="w-6 h-6 me-4" /> Tambah Pertemuan
      </Anchor>
      <Table className="mt-10">
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
                  <TableCell key={cell.id} className="space-x-3">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>

      <DeletePertemuan
        isOpen={openDeleteModal}
        setIsOpen={setOpenDeleteModal}
        data={dataModal.data as PertemuanType}
        operation={dataModal.operation as EditDeleteOperation}
      />
    </>
  );
}

export default Pertemuan;
