import { Dispatch, SetStateAction, useContext } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ListChecks, Play } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { AuthContext } from "~/context/auth";
import { Pertemuan } from "~/schema";
import ServicePresensi from "~/actions/presensi";
import { Button } from "~/components/ui/button";
import { formatTanggal } from "~/lib/utils";
import { Anchor } from "~/components/ui/anchor";
import { Progress } from "~/components/ui/progress";

export function getColumns(
  setIsOpen: Dispatch<SetStateAction<boolean>>,
  setPertemuan: Dispatch<SetStateAction<number>>
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
      header: "Kehadiran",
      cell: ({ row }) => {
        return <ProgressKehadiran pertemuan={row.original.id} />;
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
        return (
          <div className="space-x-3">
            <Anchor
              variant={"success"}
              size={"icon"}
              href={`/mahasiswa/pertemuan/${pertemuanId}`}
            >
              <Play />
            </Anchor>

            <Button
              size={"icon"}
              variant={"warning"}
              onClick={() => {
                setIsOpen(true);
                setPertemuan(pertemuanId);
              }}
            >
              <ListChecks />
            </Button>
          </div>
        );
      },
    },
  ];
}

export const ProgressKehadiran = ({ pertemuan }: { pertemuan: number }) => {
  const { akun } = useContext(AuthContext);
  const { data } = useQuery({
    queryKey: ["presensi", pertemuan],
    queryFn: async () => {
      return ServicePresensi.all(akun.username, pertemuan);
    },
    staleTime: Infinity,
    enabled: !!akun,
  });
  return data ? <Progress value={data.presentaseKehadiran} /> : "-";
};
