import { useEffect } from "react";
import { z } from "zod";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import ServiceMatakuliah from "~/actions/matakuliah";
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

import { Matakuliah, matakuliahSchema } from "~/schema";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { EditDeleteOperation, ModalProps } from "~/type";

function EditProdi({
  data,
  operation,
  isOpen,
  setIsOpen,
}: ModalProps<EditDeleteOperation, Matakuliah>) {
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof matakuliahSchema>>({
    resolver: zodResolver(matakuliahSchema),
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

  const matakuliahMutation = useMutation({
    mutationKey: ["edit-matakuliah"],
    mutationFn: async (payload: Matakuliah) => {
      return await ServiceMatakuliah.update(data.kode, payload);
    },
    onSuccess: (payload) => {
      toast.success(`Matakuliah ${payload.nama} berhasil diedit`);
      setIsOpen(false);
      queryClient.invalidateQueries({ queryKey: ["matakuliah"] });
    },
    onError: () => {
      toast.error("Matakuliah gagal ditambahkan");
    },
  });

  function onSubmit(values: Matakuliah) {
    matakuliahMutation.mutate(values);
    // console.log(values);
  }
  return (
    <Dialog open={isOpen && operation === "edit"} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Matakuliah</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="kode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kode</FormLabel>
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
                  <FormLabel>Nama</FormLabel>
                  <FormControl>
                    <Input placeholder="nama" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={matakuliahMutation.isPending}>
                {matakuliahMutation.isPending ? "Menyimpan" : "Simpan"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default EditProdi;
