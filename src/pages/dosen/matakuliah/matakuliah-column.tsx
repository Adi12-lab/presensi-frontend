import { ColumnDef } from "@tanstack/react-table";
import { Network } from "lucide-react";
import { Matakuliah} from "~/schema";

import { Anchor } from "~/components/ui/anchor";
export const columns: ColumnDef<Matakuliah>[] = [
  {
    accessorKey: "kode",
    header: "KODE",
  },
  {
    accessorKey: "nama",
    header: "MATAKULIAH",
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
