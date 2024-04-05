import { useState } from "react";
import { Trash2, Pencil, Network } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { EditDeleteOperation } from "~/type";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Button } from "~/components/ui/button";
import { Prodi as ProdiType } from "~/schema";

import ServiceProdi from "~/actions/prodi";
import AddProdi from "./add-prodi";
import DeleteProdi from "./delete-prodi";
import EditProdi from "./edit-prodi";
import Wrapper from "~/components/layout/wrapper";
import { Anchor } from "~/components/ui/anchor";

type DataModal = {
  data?: ProdiType;
  editDeleteOperation: EditDeleteOperation;
};

function Prodi() {
  const [openModal, setOpenModal] = useState(false);
  const [dataModal, setDataModal] = useState<DataModal>({
    editDeleteOperation: "delete",
  });
  const { data } = useQuery({
    queryKey: ["prodi"],
    queryFn: ServiceProdi.all,
    staleTime: 1000 * 60 * 5,
  });

  return (
    <Wrapper>
      <div>
        <h1 className="font-bold text-xl">Daftar Program Studi</h1>
      </div>

      <AddProdi />
      <Table className="mt-10">
        <TableCaption>Daftar Prodi</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Kode</TableHead>
            <TableHead>Nama</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data &&
            data.map((prodi: ProdiType) => (
              <TableRow key={prodi.kode}>
                <TableCell>{prodi.kode}</TableCell>
                <TableCell>{prodi.nama}</TableCell>
                <TableCell className="space-x-4">
                  <Anchor variant={'outline'} size={'icon'} href={`/admin/prodi/${prodi.kode}/kelas`}>
                    <Network />
                  </Anchor>
                  <Button
                    variant={"warning"}
                    size="icon"
                    onClick={() => {
                      setOpenModal(true);
                      setDataModal({
                        editDeleteOperation: "edit",
                        data: prodi,
                      });
                    }}
                  >
                    <Pencil />
                  </Button>
                  <Button
                    variant={"destructive"}
                    size="icon"
                    onClick={() => {
                      setOpenModal(true);
                      setDataModal({
                        editDeleteOperation: "delete",
                        data: prodi,
                      });
                    }}
                  >
                    <Trash2 />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      <EditProdi
        data={dataModal.data as ProdiType}
        isOpen={openModal}
        setIsOpen={setOpenModal}
        operation={dataModal.editDeleteOperation}
      />

      <DeleteProdi
        data={dataModal.data as ProdiType}
        isOpen={openModal}
        setIsOpen={setOpenModal}
        operation={dataModal.editDeleteOperation}
      />
    </Wrapper>
  );
}

export default Prodi;
