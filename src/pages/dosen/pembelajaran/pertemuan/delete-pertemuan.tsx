import React, { FC } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

import { ModalProps, EditDeleteOperation } from "~/type";
import { Pertemuan } from "~/schema";
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
import ServicePertemuan from "~/actions/pertemuan";

const DeletePertemuan: FC<ModalProps<EditDeleteOperation, Pertemuan>> = ({
  data,
  operation,
  isOpen,
  setIsOpen,
}) => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationKey: ["delete-pertemuan"],
    mutationFn: ServicePertemuan.delete,
    onSuccess: () => {
      setIsOpen(false);
      toast.success(`pertemuan berhasil dihapus`);
      queryClient.invalidateQueries({
        queryKey: ["pertemuan", { pembelajaran: data.pembelajaranId }],
      });
    },
    onError: () => {},
  });
  const handleDelete = () => {
    if (data) {
      deleteMutation.mutate(data.id);
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
              Anda yakin ingin menghapus pertemuan ini ?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription>
            Semua presensi akan dihapus
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
              disabled={deleteMutation.isPending}
              variant={"destructive"}
              onClick={handleDelete}
            >
              {deleteMutation.isPending ? (
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

export default DeletePertemuan;
