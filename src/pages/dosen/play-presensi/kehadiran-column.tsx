import { ColumnDef } from "@tanstack/react-table";
import { Mahasiswa } from "~/schema";
import { Socket } from "socket.io-client";
import { Checkbox } from "~/components/ui/checkbox";
export function getColumns(
  socket: Socket,
  pertemuan: number,
  isActive: boolean
): ColumnDef<Mahasiswa>[] {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          disabled={!isActive}
          onCheckedChange={(value) => {
            const isChecked = !!value;
            table.toggleAllPageRowsSelected(!!value);
            const rows = table.getCoreRowModel().rows;
            const nim = rows.reduce((acc: Record<string, boolean>, row) => {
              acc[row.id] = isChecked;
              return acc;
            }, {});
            // console.log(nim)
            // Emit socket event with the correct value and selected rows
            socket.emit("presensi", {
              pertemuan_id: pertemuan,
              nim: nim,
              is_dosen_do_presence: true,
              value: isChecked,
            });
          }}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => {
        const nim = row.original.nim;
        return (
          <Checkbox
            checked={row.getIsSelected()}
            disabled={!isActive}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            onClick={() => {
              socket.emit("presensi", {
                pertemuan_id: pertemuan,
                nim,
                is_dosen_do_presence: true,
                value: !row.getIsSelected(),
              });
            }}
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
