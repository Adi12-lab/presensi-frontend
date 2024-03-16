import React, { FC, useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

import { ModalProps, EditDeleteOperation } from "~/type";
import { AnggotaKelas, Mahasiswa } from "~/schema";
import toast from "react-hot-toast";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";
import ServiceKelas from "~/actions/kelas";
import { KelasContext } from "../detail-kelas";

const DeleteAnggota: FC<
  ModalProps<EditDeleteOperation, Mahasiswa>
> = ({ data, operation, isOpen, setIsOpen }) => {
  const queryClient = useQueryClient();
  const kelasKode = useContext(KelasContext);

  const kelasMutation = useMutation({
    mutationKey: ["delete-anggota"],
    mutationFn: async (payload: AnggotaKelas) => {
      return await ServiceKelas.deleteAnggota(kelasKode, payload);
    },
    onSuccess: () => {
      setIsOpen(false);
      toast.success(`Anggota Kelas berhasil dihapus`);
      queryClient.invalidateQueries({
        queryKey: ["anggota"],
      });
    },
    onError: () => {
        toast.error('Anggota kelas tidak berhasil dihapus')
    },
  });
  const handleDelete = () => {
    if (data) {
      kelasMutation.mutate(data);
    }
  };
  return (
    data && (
      <AlertDialog
        open={isOpen && operation === "delete"}
        onOpenChange={setIsOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Anda yakin ingin menghapus Anggota "{data.nama}"
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription>
            Tindakan anda tidak dapat diurungkan
          </AlertDialogDescription>
          <AlertDialogFooter>
            <Button
              variant="default"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              Batal
            </Button>
            <Button
              type="submit"
              disabled={kelasMutation.isPending}
              variant={"destructive"}
              onClick={handleDelete}
            >
              {kelasMutation.isPending ? (
                <React.Fragment>
                  <Loader2 />
                  Menghapus
                </React.Fragment>
              ) : (
                "Hapus"
              )}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  );
};

export default DeleteAnggota;
