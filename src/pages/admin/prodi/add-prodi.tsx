import { useState } from "react";
import { z } from "zod";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { PlusSquare } from "lucide-react";

import ServiceProdi from "~/actions/prodi";
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

import { Prodi, prodiSchema } from "~/schema";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

function AddProdi() {
  const queryClient = useQueryClient();

  const [openDialog, setOpenDialog] = useState(false);
  const form = useForm<z.infer<typeof prodiSchema>>({
    resolver: zodResolver(prodiSchema),
    defaultValues: {
      kode: "",
      nama: "",
    },
    mode: "onChange",
  });

  const prodiMutation = useMutation({
    mutationKey: ["add-prodi"],
    mutationFn: ServiceProdi.create,
    onSuccess: (payload) => {
      toast.success(`Prodi ${payload.nama} berhasil ditambahkan`);
      setOpenDialog(false);
      queryClient.invalidateQueries({ queryKey: ["prodi"] });
    },
    onError: () => {
      toast.error("Prodi gagal ditambahkan");
    },
  });

  function onSubmit(values: Prodi) {
    prodiMutation.mutate(values);
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
          <PlusSquare className="w-6 h-6 me-4" /> Tambah Prodi
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tambah Program Studi</DialogTitle>
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
              <Button type="submit" disabled={prodiMutation.isPending}>
                {prodiMutation.isPending ? "Menyimpan" : "Simpan"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default AddProdi;
