import React, { FC } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

import { ModalProps, EditDeleteOperation } from "~/type";
import { Kelas } from "~/schema";
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

const DeleteKelas: FC<ModalProps<EditDeleteOperation, Kelas>> = ({
  data,
  operation,
  isOpen,
  setIsOpen,
}) => {
  const queryClient = useQueryClient();

  const deleteKelasMutation = useMutation({
    mutationKey: ["delete-kelas"],
    mutationFn: ServiceKelas.delete,
    onSuccess: (data) => {
      setIsOpen(false);
      toast.success(`Kelas ${data.nama} berhasil dihapus`);
      queryClient.invalidateQueries({
        queryKey: ["kelas"],
      });
    },
    onError: () => {},
  });
  const handleDelete = () => {
    if (data) {
      deleteKelasMutation.mutate(data.kode);
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
              Anda yakin ingin menghapus kelas {data.nama}
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
              disabled={deleteKelasMutation.isPending}
              variant={"destructive"}
              onClick={handleDelete}
            >
              {deleteKelasMutation.isPending ? (
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

export default DeleteKelas;
