import { ColumnDef } from "@tanstack/react-table";
import { Presentation } from "lucide-react";
import { Kelas, Prodi } from "~/schema";

import { Anchor } from "~/components/ui/anchor";

type KelasWithPembelajaran = Kelas & {pembelajaranId: string}

export type KelasProdi = KelasWithPembelajaran & {
  prodi: Prodi;
};

export const columns: ColumnDef<KelasProdi>[] = [
    {
      header: "KELAS",
      id: "kelas",
      accessorFn: (row) => `${row.prodi.kode} ${row.nama} ${row.angkatan}`,
      cell: ({ row }) => {
        const kelas = row.original;
        return (
          <span>
            {kelas.prodi.kode} - {kelas.nama} - {kelas.angkatan}
          </span>
        );
      },
    },
    {
      header: "PROGRAM STUDI",
      accessorKey: "prodi.nama",
    },
    {
      id: "aksi",
      cell: ({ row }) => {
        const kelas = row.original;
        return (
          <Anchor
            variant="outline"
            size={"icon"}
            href={`/dosen/pembelajaran/${kelas.pembelajaranId}/`}
          >
            <Presentation />
          </Anchor>
        );
      },
    },
  ];

