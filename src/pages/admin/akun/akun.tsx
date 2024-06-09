import { useState } from "react";
import { Trash2, Pencil } from "lucide-react";
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
import { Akun as AkunType } from "~/schema";

import ServiceAkun from "~/actions/akun";
import AddAkun from "./add-akun";
import DeleteAkun from "./delete-akun";
import EditAkun from "./edit-akun";
import Wrapper from "~/components/layout/wrapper";
import { Badge } from "~/components/ui/badge";

type DataModal = {
  data?: AkunType;
  editDeleteOperation: EditDeleteOperation;
};

function Prodi() {
  const [openModal, setOpenModal] = useState(false);
  const [dataModal, setDataModal] = useState<DataModal>({
    editDeleteOperation: "delete",
  });
  const { data } = useQuery({
    queryKey: ["akun"],
    queryFn: async () => {
      return await ServiceAkun.all();
    },
    staleTime: 1000 * 60 * 5,
  });

  return (
    <Wrapper>
      <div>
        <h1 className="font-bold text-xl">Daftar Akun</h1>
      </div>

      <AddAkun />
      <Table className="mt-10">
        <TableCaption>Daftar Akun</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Username</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Aktif</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data &&
            data.map((akun: AkunType) => (
              <TableRow key={akun.username}>
                <TableCell>{akun.username}</TableCell>
                <TableCell>{akun.role}</TableCell>
                <TableCell>
                  {
                    <Badge variant={"default"}>
                      {akun.isActive ? "aktif" : "nonaktif"}
                    </Badge>
                  }
                </TableCell>
                <TableCell className="space-x-4">
                  <Button
                    variant={"warning"}
                    size="icon"
                    onClick={() => {
                      setOpenModal(true);
                      setDataModal({
                        editDeleteOperation: "edit",
                        data: akun,
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
                        data: akun,
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

      <EditAkun
        data={dataModal.data as AkunType}
        isOpen={openModal}
        setIsOpen={setOpenModal}
        operation={dataModal.editDeleteOperation}
      />

      <DeleteAkun
        data={dataModal.data as AkunType}
        isOpen={openModal}
        setIsOpen={setOpenModal}
        operation={dataModal.editDeleteOperation}
      />
    </Wrapper>
  );
}

export default Prodi;
