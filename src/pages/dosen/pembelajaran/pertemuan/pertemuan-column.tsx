import { ColumnDef } from "@tanstack/react-table";
import { Play } from "lucide-react";
import { Anchor } from "~/components/ui/anchor";
import { Pertemuan } from "~/schema";
import { formatTanggal } from "~/lib/utils";

export function getTableColumns(kelas: string): ColumnDef<Pertemuan>[] {
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
      id: "aksi",
      header: "Aksi",
      cell: ({ row }) => {
        const pertemuanId = row.original.id;
        return (
          <Anchor
            variant={"success"}
            size={"icon"}
            href={`/dosen/kelas/${kelas}/play-presensi?pertemuan=${pertemuanId}`}
          >
            <Play />
          </Anchor>
        );
      },
    },
  ];
}
