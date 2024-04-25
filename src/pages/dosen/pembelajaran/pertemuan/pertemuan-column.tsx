import React, { SetStateAction } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Play, List, Trash2 } from "lucide-react";
import { Anchor } from "~/components/ui/anchor";
import { Button } from "~/components/ui/button";
import { Pertemuan } from "~/schema";
import { cn, formatTanggal } from "~/lib/utils";

import { DataModal } from "./pertemuan";
export function getTableColumns(
  kelas: string,
  setDataModal: React.Dispatch<SetStateAction<DataModal>>,
  setOpen: React.Dispatch<SetStateAction<boolean>>
): ColumnDef<Pertemuan>[] {
  return [
    {
      accessorKey: "pertemuanKe",
      header: "Pertemuan",
      cell: ({ row }) => {
        const pertemuanKe = row.original.pertemuanKe;
        return <span>Pertemuan {pertemuanKe}</span>;
      },
    },
    {
      header: "Tanggal",
      accessorKey: "tanggal",
      cell: ({ row }) => {
        const tanggal = row.original.tanggal;
        return <span>{formatTanggal(new Date(tanggal))}</span>;
      },
    },
    {
      header: "Status",
      cell: ({ row }) => {
        return <span className="uppercase">{row.original.statusTimer}</span>;
      },
    },
    {
      id: "aksi",
      header: "Aksi",
      cell: ({ row }) => {
        const pertemuanId = row.original.id;
        const pertemuanStatus = row.original.statusTimer;
        const pertemuan = row.original;
        return (
          <>
            <Anchor
              variant={"success"}
              size={"icon"}
              href={
                pertemuanStatus !== "selesai"
                  ? `/dosen/kelas/${kelas}/play-presensi?pertemuan=${pertemuanId}`
                  : "#"
              }
              className={cn(
                pertemuanStatus === "selesai" ? "opacity-70" : "opacity-100"
              )}
            >
              <Play />
            </Anchor>
            <Anchor
              variant={"warning"}
              size={"icon"}
              href={`/dosen/kelas/${kelas}/pertemuan/${pertemuanId}`}
            >
              <List />
            </Anchor>
            <Button
              variant={"destructive"}
              size={"icon"}
              onClick={() => {
                setOpen(true);
                setDataModal({
                  data: pertemuan,
                  operation: "delete",
                });
              }}
            >
              <Trash2 />
            </Button>
          </>
        );
      },
    },
  ];
}
