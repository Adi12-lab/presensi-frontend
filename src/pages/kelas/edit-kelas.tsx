import { useEffect } from "react";
import { z } from "zod";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import ServiceKelas from "~/actions/kelas";
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

import { Kelas, NewKelas, kelasSchema } from "~/schema";
import { ModalProps, EditDeleteOperation } from "~/type";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

function EditKelas({
  data,
  operation,
  isOpen,
  setIsOpen,
}: ModalProps<EditDeleteOperation, Kelas>) {
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof kelasSchema>>({
    resolver: zodResolver(kelasSchema),
    defaultValues: {
      nama: "",
      angkatan: 0,
      prodiKode: "",
    },
  });

  useEffect(() => {
    if (data) {
      form.setValue("angkatan", data.angkatan);
      form.setValue("nama", data.nama);
      form.setValue("prodiKode", data.prodiKode);
    }
  }, [data, form]);

  const kelasMutation = useMutation({
    mutationKey: ["edit-kelas"],
    mutationFn: async (kelas: NewKelas) => {
      return await ServiceKelas.update(data.kode, kelas);
    },
    onSuccess: (payload) => {
      toast.success(`Kelas ${payload.nama} berhasil diedit`);
      queryClient.invalidateQueries({ queryKey: ["kelas"] });
      setIsOpen(false);
    },
    onError: () => {
      toast.error("Kelas gagal diedit");
    },
  });

  function onSubmit(values: NewKelas) {
    kelasMutation.mutate(values);
    // console.log(values);
  }
  return (
    <Dialog open={isOpen && operation === "edit"} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Kelas</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="nama"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Kelas</FormLabel>
                  <FormControl>
                    <Input placeholder="kelas" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="angkatan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Angkatan</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="nama"
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={kelasMutation.isPending}>
                {kelasMutation.isPending ? "Menyimpan" : "Simpan"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default EditKelas;
