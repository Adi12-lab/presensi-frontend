import React, { FC } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

import { ModalProps, EditDeleteOperation } from "~/type";
import { Akun } from "~/schema";
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
import ServiceProdi from "~/actions/prodi";

const DeleteAkun: FC<ModalProps<EditDeleteOperation, Akun>> = ({
  data,
  operation,
  isOpen,
  setIsOpen,
}) => {
  const queryClient = useQueryClient();

  const deleteProdiMutation = useMutation({
    mutationKey: ["delete-akun"],
    mutationFn: ServiceProdi.delete,
    onSuccess: (data: Akun) => {
      setIsOpen(false);
      toast.success(`Akun ${data.username} berhasil dihapus`);
      queryClient.invalidateQueries({
        queryKey: ["akun"],
      });
    },
    onError: () => {},
  });
  const handleDelete = () => {
    if (data) {
      deleteProdiMutation.mutate(data.username);
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
              Anda yakin ingin menghapus username {data.username}
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

export default DeleteAkun;
