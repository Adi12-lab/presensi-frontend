import { useState } from "react";
import { z } from "zod";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { PlusSquare } from "lucide-react";

import ServiceMatakuliah from "~/actions/matakuliah";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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

function AddMatakuliah() {
  const queryClient = useQueryClient();

  const [openDialog, setOpenDialog] = useState(false);
  const form = useForm<z.infer<typeof matakuliahSchema>>({
    resolver: zodResolver(matakuliahSchema),
    defaultValues: {
      kode: "",
      nama: "",
    },
  });

  const matakuliahMutation = useMutation({
    mutationKey: ["add-matakuliah"],
    mutationFn: ServiceMatakuliah.create,
    onSuccess: (payload) => {
      toast.success(`Matakuliah ${payload.nama} berhasil ditambahkan`);
      setOpenDialog(false);
      queryClient.invalidateQueries({ queryKey: ["matakuliah"] });
    },
    onError: () => {
      toast.error("Matakuliah gagal ditambahkan");
    },
  });

  function onSubmit(values: Matakuliah) {
    matakuliahMutation.mutate(values);
  }
  return (
    <Dialog
      open={openDialog}
      onOpenChange={() => {
        form.reset();
        setOpenDialog(!openDialog);
      }}
    >
      <DialogTrigger asChild>
        <Button
          variant={"secondary"}
          size="lg"
          className="text-lg mt-4 float-right"
        >
          <PlusSquare className="w-6 h-6 me-4" /> Tambah Matakuliah
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tambah Matakuliah</DialogTitle>
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

export default AddMatakuliah;
