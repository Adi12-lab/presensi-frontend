import React, { FC } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

import { ModalProps, EditDeleteOperation } from "~/type";
import { PembelajaranComplete } from "~/schema";
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
import ServicePembelajaran from "~/actions/pembelajaran";

const DeletePembelajaran: FC<ModalProps<EditDeleteOperation, PembelajaranComplete>> = ({
  data,
  operation,
  isOpen,
  setIsOpen,
}) => {
  const queryClient = useQueryClient();

  const deleteProdiMutation = useMutation({
    mutationKey: ["delete-pembelajaran"],
    mutationFn: ServicePembelajaran.delete,
    onSuccess: () => {
      setIsOpen(false);
      toast.success(`Pembelajaran berhasil dihapus`);
      queryClient.invalidateQueries({
        queryKey: ["pembelajaran"],
      });
    },
    onError: () => {},
  });
  const handleDelete = () => {
    if (data) {
      deleteProdiMutation.mutate(data.id);
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
              Anda yakin ingin menghapus pembelajaran {data.matakuliah.nama}
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
              disabled={deleteProdiMutation.isPending}
              variant={"destructive"}
              onClick={handleDelete}
            >
              {deleteProdiMutation.isPending ? (
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

export default DeletePembelajaran;
