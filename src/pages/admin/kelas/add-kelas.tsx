import { useState } from "react";
import { z } from "zod";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { PlusSquare } from "lucide-react";

import ServiceKelas from "~/actions/kelas";
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

import { NewKelas, kelasSchema } from "~/schema";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

function AddKelas({ prodi }: { prodi: string }) {
  const queryClient = useQueryClient();

  const [openDialog, setOpenDialog] = useState(false);
  const form = useForm<z.infer<typeof kelasSchema>>({
    resolver: zodResolver(kelasSchema),
    defaultValues: {
      nama: "",
      angkatan: 0,
      prodiKode: prodi,
    },
  });

  const kelasMutation = useMutation({
    mutationKey: ["add-kelas"],
    mutationFn: ServiceKelas.create,
    onSuccess: (payload) => {
      toast.success(`Kelas ${payload.nama} berhasil ditambahkan`);
      setOpenDialog(false);
      queryClient.invalidateQueries({ queryKey: ["kelas"] });
    },
    onError: () => {
      toast.error("Kelas gagal ditambahkan");
    },
  });

  function onSubmit(values: NewKelas) {
    kelasMutation.mutate(values);
    // console.log(values);
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
          <PlusSquare className="w-6 h-6 me-4" /> Tambah Kelas
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tambah Kelas</DialogTitle>
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

export default AddKelas;
