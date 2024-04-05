import { ColumnDef } from "@tanstack/react-table";
import { Mahasiswa } from "~/schema";

import { Checkbox } from "~/components/ui/checkbox";
export function getColumns(): ColumnDef<Mahasiswa>[] {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => {
        return (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        );
      },
    },
    {
      accessorKey: "nim",
      header: "NIM",
    },
    {
      accessorKey: "nama",
      header: "NAMA",
    },
  ];
}
