import { useContext, useEffect, useState } from "react";
import { z } from "zod";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { PlusSquare } from "lucide-react";

import ServicePembelajaran from "~/actions/pembelajaran";
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

import { NewPembelajaran, pembelajaranSchema } from "~/schema";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

import DosenComboBox from "./dosen-combobox";
import MatakuliahComboBox from "./matakuliah-combobox";
import { KelasContext } from "../detail-kelas";
function AddPembelajaran() {
  const kelasKode = useContext(KelasContext);
  const queryClient = useQueryClient();

  const [openDialog, setOpenDialog] = useState(false);
  const form = useForm<z.infer<typeof pembelajaranSchema>>({
    resolver: zodResolver(pembelajaranSchema),
    defaultValues: {
      dosenNidn: "",
      kelasKode,
      matakuliahKode: "",
      semester: 1,
      sks: 0,
      tahunPembelajaran: "",
      totalJam: 0,
    },
  });

  useEffect(() => {
    if (form && kelasKode) {
      form.setValue("kelasKode", kelasKode);
    }
  }, [form, kelasKode]);

  const pembelajaranMutation = useMutation({
    mutationKey: ["add-pembelajaran"],
    mutationFn: ServicePembelajaran.create,
    onSuccess: () => {
      toast.success(`Pembelajaran berhasil ditambahkan`);
      setOpenDialog(false);
      queryClient.invalidateQueries({ queryKey: ["pembelajaran"] });
    },
    onError: () => {
      toast.error("Pembelajaran gagal ditambahkan");
    },
  });

  function onSubmit(values: NewPembelajaran) {
    pembelajaranMutation.mutate(values);
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
          <PlusSquare className="w-6 h-6 me-4" /> Tambah Pembelajaran
        </Button>
      </DialogTrigger>
      {kelasKode && (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tambah Pembelajaran</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="semester"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Semester</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="sks"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jumlah SKS</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="totalJam"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Jam Pembelajaran</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tahunPembelajaran"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tahun Pembelajaran</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="matakuliahKode"
                render={() => (
                  <FormItem>
                    <FormLabel>Matakuliah</FormLabel>
                    <FormControl>
                      <MatakuliahComboBox form={form} field="matakuliahKode" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dosenNidn"
                render={() => (
                  <FormItem>
                    <FormLabel>Dosen Pengampu</FormLabel>
                    <FormControl>
                      <DosenComboBox form={form} field="dosenNidn" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button type="submit" disabled={pembelajaranMutation.isPending}>
                  {pembelajaranMutation.isPending ? "Menyimpan" : "Simpan"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      )}
    </Dialog>
  );
}

export default AddPembelajaran;
