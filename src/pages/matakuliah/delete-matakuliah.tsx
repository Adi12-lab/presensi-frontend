import React, { FC } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

import { ModalProps, EditDeleteOperation } from "~/type";
import { Matakuliah } from "~/schema";
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
import ServiceMatakuliah from "~/actions/matakuliah";

const DeleteMatakuliah: FC<ModalProps<EditDeleteOperation, Matakuliah>> = ({
  data,
  operation,
  isOpen,
  setIsOpen,
}) => {
  const queryClient = useQueryClient();

  const matakuliahMutation = useMutation({
    mutationKey: ["delete-matakuliah"],
    mutationFn: ServiceMatakuliah.delete,
    onSuccess: (data) => {
      setIsOpen(false);
      toast.success(`Matakuliah ${data.nama} berhasil dihapus`);
      queryClient.invalidateQueries({
        queryKey: ["matakuliah"],
      });
    },
    onError: () => {},
  });
  const handleDelete = () => {
    if (data) {
      matakuliahMutation.mutate(data.kode);
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
              Anda yakin ingin menghapus prodi {data.nama}
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
              disabled={matakuliahMutation.isPending}
              variant={"destructive"}
              onClick={handleDelete}
            >
              {matakuliahMutation.isPending ? (
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

export default DeleteMatakuliah;
