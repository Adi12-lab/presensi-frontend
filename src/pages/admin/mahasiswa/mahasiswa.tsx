import { Trash2, Pencil, PlusSquare } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Mahasiswa as MahasiswaType } from "~/schema";

import ServiceMahasiswa from "~/actions/mahasiswa";
import Wrapper from "~/components/layout/wrapper";
import { Anchor } from "~/components/ui/anchor";

function Mahasiswa() {
  const { data } = useQuery<MahasiswaType[]>({
    queryKey: ["mahasiswa"],
    queryFn: async () => {
      return await ServiceMahasiswa.all();
    },
    staleTime: 1000 * 60 * 5,
  });

  return (
    data && (
      <Wrapper>
        <div>
          <h1 className="font-bold text-xl">Daftar Mahasiswa PSDKU Lumajang</h1>
        </div>

        <Anchor
          variant={"secondary"}
          size="lg"
          href="/mahasiswa/add"
          className="text-lg mt-4 float-right"
        >
          <PlusSquare className="w-6 h-6 me-4" /> Tambah Mahasiswa
        </Anchor>
        <Table className="mt-10">
          <TableCaption>Daftar Mahasiswa</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Nim</TableHead>
              <TableHead>Nama</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((mahasiswa) => (
              <TableRow key={mahasiswa.nim}>
                <TableCell>{mahasiswa.nim}</TableCell>
                <TableCell>{mahasiswa.nama}</TableCell>
                <TableCell>{mahasiswa.email}</TableCell>
                <TableCell className="space-x-4">
                  <Anchor
                    variant={"warning"}
                    size="icon"
                    href={`/mahasiswa/${mahasiswa.nim}/edit`}
                  >
                    <Pencil />
                  </Anchor>
                  <Anchor variant={"destructive"} size="icon">
                    <Trash2 />
                  </Anchor>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Wrapper>
    )
  );
}

export default Mahasiswa;
