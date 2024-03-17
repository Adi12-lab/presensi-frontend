import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";

import { Matakuliah, Kelas } from "~/schema";
import ServiceMatakuliah from "~/actions/matakuliah";

type MatakuliahKelas = Matakuliah & {
  kelas: Kelas[];
};

function Kelas() {
  const { kode } = useParams();
  const { data } = useQuery<MatakuliahKelas>({
    queryKey: ["matakuliah", kode],
    queryFn: async () => {
      return await ServiceMatakuliah.findByDosen(kode as string);
    },
    enabled: !!kode,
  });

  const table = useReactTable({
    columns,
    data: data as MatakuliahType[],
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return <div>{kode}</div>;
}

export default Kelas;
