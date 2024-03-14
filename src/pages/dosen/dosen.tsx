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
import { Dosen as DosenType } from "~/schema";

import ServiceDosen from "~/actions/dosen";
import Wrapper from "~/components/layout/wrapper";
import { Anchor } from "~/components/ui/anchor";

function Dosen() {
  const { data } = useQuery<DosenType[]>({
    queryKey: ["dosen"],
    queryFn: ServiceDosen.all,
    staleTime: 1000 * 60 * 5,
  });

  return (
    data && (
      <Wrapper>
        <div>
          <h1 className="font-bold text-xl">Daftar Dosen PSDKU Lumajang</h1>
        </div>

        <Anchor
          variant={"secondary"}
          size="lg"
          href="/dosen/add"
          className="text-lg mt-4 float-right"
        >
          <PlusSquare className="w-6 h-6 me-4" /> Tambah Dosen
        </Anchor>
        <Table className="mt-10">
          <TableCaption>Daftar Dosen</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>NIDN</TableHead>
              <TableHead>Nama</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((dosen) => (
              <TableRow key={dosen.nidn}>
                <TableCell>{dosen.nidn}</TableCell>
                <TableCell>{dosen.nama}</TableCell>
                <TableCell>{dosen.email}</TableCell>
                <TableCell className="space-x-4">
                  <Anchor
                    variant={"warning"}
                    size="icon"
                    href={`/dosen/${dosen.nidn}/edit`}
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

export default Dosen;
