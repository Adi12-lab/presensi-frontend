import { ColumnDef } from "@tanstack/react-table";
import React, { SetStateAction } from "react";
import { Mahasiswa} from "~/schema";
import { Button } from "~/components/ui/button";
import { Trash2 } from "lucide-react";
import { DataModal } from "./anggota";

export function getTableColums(
  setDataModal: React.Dispatch<SetStateAction<DataModal>>,
  setOpen: React.Dispatch<SetStateAction<boolean>>
): ColumnDef<Mahasiswa>[] {
  return [
    {
      accessorKey: "nim",
      header: "Nim",
    },
    {
      accessorKey: "nama",
      header: "Nama",
    },
    {
      id: "aksi",
      header: "Aksi",
      cell: ({ row }) => {
        const mahasiswa = row.original;

        return (
          <div className="space-x-3">
            
            <Button
              variant={"destructive"}
              size={"icon"}
              onClick={() => {
                setDataModal({
                  editDeleteOperation: "delete",
                  data: mahasiswa,
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
