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
import { Matakuliah as MatakuliahType } from "~/schema";

import ServiceMatakuliah from "~/actions/matakuliah";
import AddMatakuliah from "./add-matakuliah";
import DeleteMatakuliah from "./delete-matakuliah";
import EditProdi from "./edit-matakuliah";
import Wrapper from "~/components/layout/wrapper";
import { Anchor } from "~/components/ui/anchor";

type DataModal = {
  data?: MatakuliahType;
  editDeleteOperation: EditDeleteOperation;
};

function Matakuliah() {
  const [openModal, setOpenModal] = useState(false);
  const [dataModal, setDataModal] = useState<DataModal>({
    editDeleteOperation: "delete",
  });
  const { data } = useQuery({
    queryKey: ["matakuliah"],
    queryFn: ServiceMatakuliah.all,
    staleTime: 1000 * 60 * 5,
  });

  return (
    <Wrapper>
      <div>
        <h1 className="font-bold text-xl">Daftar Matakuliah</h1>
      </div>

      <AddMatakuliah />
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
            data.map((matakuliah: MatakuliahType) => (
              <TableRow key={matakuliah.kode}>
                <TableCell>{matakuliah.kode}</TableCell>
                <TableCell>{matakuliah.nama}</TableCell>
                <TableCell className="space-x-4">
                  <Anchor variant={'outline'} size={'icon'} href={`matakuliah/${matakuliah.kode}/kelas`}>
                    <Network />
                  </Anchor>
                  <Button
                    variant={"warning"}
                    size="icon"
                    onClick={() => {
                      setOpenModal(true);
                      setDataModal({
                        editDeleteOperation: "edit",
                        data: matakuliah,
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
                        data: matakuliah,
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
        data={dataModal.data as MatakuliahType}
        isOpen={openModal}
        setIsOpen={setOpenModal}
        operation={dataModal.editDeleteOperation}
      />

      <DeleteMatakuliah
        data={dataModal.data as MatakuliahType}
        isOpen={openModal}
        setIsOpen={setOpenModal}
        operation={dataModal.editDeleteOperation}
      />
    </Wrapper>
  );
}

export default Matakuliah;
