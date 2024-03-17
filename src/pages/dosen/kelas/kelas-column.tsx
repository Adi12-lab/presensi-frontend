import { ColumnDef } from "@tanstack/react-table";
import { Network } from "lucide-react";
import { Kelas, Prodi} from "~/schema";

import { Anchor } from "~/components/ui/anchor";

type KelasProdi = Kelas & {
    prodi: Prodi[]

}


export const columns: ColumnDef<KelasProdi>[] = [
  {
    header: "KELAS",
    cell: ({row}) => {
        const kelas = row.original
        return (
            <span>-{kelas.nama}-</span>
        )
    }
  },
  {
    id: "aksi",
    cell: ({row}) => {
      const matakuliah = row.original
      return (
        <Anchor variant='outline' size={'icon'} href={`/dosen/matakuliah/${matakuliah.kode}/kelas`}>
          <Network />
        </Anchor>
      )
    }
  }
];
