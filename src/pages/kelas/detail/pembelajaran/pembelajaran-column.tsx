import { ColumnDef } from "@tanstack/react-table";
import React, { SetStateAction } from "react";
import { PembelajaranComplete } from "~/schema";
import { Button } from "~/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { DataModal } from "./pembelajaran";

export function getTableColums(
  setDataModal: React.Dispatch<SetStateAction<DataModal>>,
  setOpen: React.Dispatch<SetStateAction<boolean>>
): ColumnDef<PembelajaranComplete>[] {
  return [
    {
      accessorKey: "matakuliah.nama",
      header: "Matakuliah",
    },
    {
      accessorKey: "dosen.nama",
      header: "Dosen",
    },
    {
      accessorKey: "tahunPembelajaran",
      header: "Tahun Pembelajaran",
    },
    {
      accessorKey: "semester",
      header: "Semester",
    },
    {
      accessorKey: "sks",
      header: "Jumlah SKS",
    },
    {
      id: "aksi",
      header: "Aksi",
      cell: ({ row }) => {
        const pembelajaran = row.original;

        return (
          <div className="space-x-3">
            <Button
              variant={"warning"}
              size={"icon"}
              onClick={() => {
                setDataModal({
                  editDeleteOperation: "edit",
                  data: pembelajaran,
                });
                setOpen(true);
              }}
            >
              <Pencil />
            </Button>

            <Button
              variant={"destructive"}
              size={"icon"}
              onClick={() => {
                setDataModal({
                  editDeleteOperation: "delete",
                  data: pembelajaran,
                });
                setOpen(true);
              }}
            >
              <Trash2 />
            </Button>
          </div>
        );
      },
    },
  ];
}
