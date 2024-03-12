import { useState } from "react";
import { useParams } from "react-router-dom";
import { Trash2, Pencil } from "lucide-react";
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
import { Button } from "~/components/ui/button";
import { Kelas as KelasType } from "~/schema";

import { EditDeleteOperation } from "~/type";
import ServiceKelas from "~/actions/kelas";
import AddKelas from "./add-kelas";
import DeleteKelas from "./delete-kelas";
import Wrapper from "~/components/layout/wrapper";
import EditKelas from "./edit-kelas";

type DataModal = {
  data?: KelasType;
  editDeleteOperation: EditDeleteOperation;
};

function Kelas() {
  const { prodi } = useParams();
  const [openModal, setOpenModal] = useState(false);
  const [dataModal, setDataModal] = useState<DataModal>({
    editDeleteOperation: "delete",
  });
  const { data } = useQuery({
    queryKey: ["kelas"],
    queryFn: async () => {
      if (prodi) {
        return await ServiceKelas.allByProdi(prodi.toString());
      }
    },
    staleTime: 1000 * 60 * 5,
    enabled: prodi !== undefined,
  });

  return (
    data && (
      <Wrapper>
        <div>
          <h1 className="font-bold text-xl">Kelas</h1>
        </div>

        <AddKelas prodi={prodi as string} />
        <Table className="mt-10">
          <TableCaption>Kelas Prodi</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Kode</TableHead>
              <TableHead>Nama</TableHead>
              <TableHead>Angkatan</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((kelas: KelasType) => (
              <TableRow key={kelas.kode}>
                <TableCell>{kelas.kode}</TableCell>
                <TableCell>{kelas.nama}</TableCell>
                <TableCell>{kelas.angkatan}</TableCell>
                <TableCell className="space-x-3">
                  <Button
                    variant={"warning"}
                    size={"icon"}
                    onClick={() => {
                      setOpenModal(true);
                      setDataModal({
                        editDeleteOperation: "edit",
                        data: kelas,
                      });
                    }}
                  >
                    <Pencil />
                  </Button>
                  <Button
                    variant={"destructive"}
                    size={"icon"}
                    onClick={() => {
                      setOpenModal(true);
                      setDataModal({
                        editDeleteOperation: "delete",
                        data: kelas,
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

        <EditKelas
          isOpen={openModal}
          data={dataModal.data as KelasType}
          operation={dataModal.editDeleteOperation}
          setIsOpen={setOpenModal}
        />

        <DeleteKelas
          isOpen={openModal}
          data={dataModal.data as KelasType}
          operation={dataModal.editDeleteOperation}
          setIsOpen={setOpenModal}
        />
      </Wrapper>
    )
  );
}

export default Kelas;
