import { useEffect } from "react";
import { z } from "zod";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import ServiceProdi from "~/actions/prodi";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";

import { Prodi, prodiSchema } from "~/schema";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { EditDeleteOperation, ModalProps } from "~/type";

function EditProdi({
  data,
  operation,
  isOpen,
  setIsOpen,
}: ModalProps<EditDeleteOperation, Prodi>) {
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof prodiSchema>>({
    resolver: zodResolver(prodiSchema),
    defaultValues: {
      kode: "",
      nama: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (data) {
      form.setValue("kode", data.kode);
      form.setValue("nama", data.nama);
    }
  }, [data, form]);

  const editProdiMutation = useMutation({
    mutationKey: ["edit-prodi"],
    mutationFn: async (payload: Prodi) => {
      return await ServiceProdi.update(data.kode, payload);
    },
    onSuccess: (payload) => {
      toast.success(`Prodi ${payload.nama} berhasil diedit`);
      setIsOpen(false);
      queryClient.invalidateQueries({ queryKey: ["prodi"] });
    },
    onError: () => {
      toast.error("Prodi gagal ditambahkan");
    },
  });

  function onSubmit(values: Prodi) {
    editProdiMutation.mutate(values);
    // console.log(values);
  }
  return (
    <Dialog open={isOpen && operation === "edit"} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Prodi Program Studi</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="kode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kode Prodi</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="kode"
                      {...field}
                      onChange={(e) =>
                        field.onChange(e.target.value.toUpperCase())
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nama"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Program Studi</FormLabel>
                  <FormControl>
                    <Input placeholder="nama" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={editProdiMutation.isPending}>
                {editProdiMutation.isPending ? "Menyimpan" : "Simpan"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default EditProdi;
