import { useContext, useEffect } from "react";
import { z } from "zod";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import ServicePembelajaran from "~/actions/pembelajaran";
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

import {
  NewPembelajaran,
  PembelajaranComplete,
  pembelajaranSchema,
} from "~/schema";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

import DosenComboBox from "./dosen-combobox";
import MatakuliahComboBox from "./matakuliah-combobox";
import { KelasContext } from "../detail-kelas";
import { EditDeleteOperation, ModalProps } from "~/type";

function EditPembelajaran({
  data,
  operation,
  isOpen,
  setIsOpen,
}: ModalProps<EditDeleteOperation, PembelajaranComplete>) {
  const kelasKode = useContext(KelasContext);
  const queryClient = useQueryClient();

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
    form.setValue("kelasKode", kelasKode);
    if (data) {
      form.setValue("dosenNidn", data.dosenNidn);
      form.setValue("matakuliahKode", data.matakuliahKode);
      form.setValue("semester", data.semester);
      form.setValue("tahunPembelajaran", data.tahunPembelajaran);
      form.setValue("sks", data.sks);
    }
  }, [form.formState.errors, kelasKode, data]);

  const pembelajaranMutation = useMutation({
    mutationKey: ["add-pembelajaran"],
    mutationFn: ServicePembelajaran.create,
    onSuccess: () => {
      toast.success(`Pembelajaran berhasil diupdate`);
      setIsOpen(false);
      queryClient.invalidateQueries({ queryKey: ["pembelajaran"] });
    },
    onError: () => {
      toast.error("Pembelajaran gagal diupdate");
    },
  });

  function onSubmit(values: NewPembelajaran) {
    pembelajaranMutation.mutate(values);
  }
  return (
    <Dialog
      open={isOpen && operation === "edit"}
      onOpenChange={() => {
        form.reset();
        setIsOpen(!isOpen);
      }}
    >
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
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Matakuliah</FormLabel>
                    <FormControl>
                      <MatakuliahComboBox
                        value={field.value}
                        onValueChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dosenNidn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dosen Pengampu</FormLabel>
                    <FormControl>
                      <DosenComboBox
                        value={field.value}
                        onValueChange={field.onChange}
                      />
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

export default EditPembelajaran;
