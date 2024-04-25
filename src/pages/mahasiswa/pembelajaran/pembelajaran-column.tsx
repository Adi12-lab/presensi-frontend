import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import { Anchor } from "~/components/ui/anchor";
import { PembelajaranComplete } from "~/schema";

export const columns: ColumnDef<PembelajaranComplete>[] = [
  {
    id: "matakuliah",
    accessorKey: "matakuliah.nama",
    header: "Matakuliah",
  },
  {
    accessorKey: "dosen.nama",
    header: "Dosen",
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
    header: "Aksi",
    cell: ({row}) => {
      const pembelajaran = row.original
      return (
        <Anchor href={`/mahasiswa/pembelajaran/${pembelajaran.id}`} variant={'purple'} size={'icon'}>
          <Eye />
        </Anchor>
      );
    },
  },
];
