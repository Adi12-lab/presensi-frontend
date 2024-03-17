import { useState, useContext } from "react";
import { z } from "zod";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { PlusSquare, ChevronsUpDown, Check } from "lucide-react";

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

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "~/components/ui/command";
import { cn } from "~/lib/utils";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";

import { AnggotaKelas, Mahasiswa, anggotaKelasSchema } from "~/schema";

import { Button } from "~/components/ui/button";
import { KelasContext } from "../detail-kelas";

function AddAnggota({ mahasiswa }: { mahasiswa: Mahasiswa[] }) {
  const queryClient = useQueryClient();
  const kelasKode = useContext(KelasContext);

  const [openDialog, setOpenDialog] = useState(false);
  const [openComboBox, setOpenComboBox] = useState(false);
  const [mahasiswaSelected, setMahasiswaSelected] = useState("");
  const form = useForm<z.infer<typeof anggotaKelasSchema>>({
    resolver: zodResolver(anggotaKelasSchema),
    defaultValues: {
      nim: "",
    },
  });

  // useEffect(() => {
  //   console.log(form.formState.errors);
  // }, [form.formState.errors, kelasKode]);

  const anggotaMutation = useMutation({
    mutationKey: ["add-anggota"],
    mutationFn: async (payload: AnggotaKelas) => {
      console.log(kelasKode);
      return await ServiceKelas.tambahAnggota(kelasKode, payload);
    },
    onSuccess: () => {
      toast.success(`Anggota kelas berhasil ditambahkan`);
      setOpenDialog(false);
      queryClient.invalidateQueries({ queryKey: ["anggota"] });
      queryClient.invalidateQueries({ queryKey: ["mahasiswa", "combobox"] });
      setMahasiswaSelected("");
    },
    onError: () => {
      toast.error("Anggota kelas gagal ditambahkan");
    },
  });

  function onSubmit(values: AnggotaKelas) {
    anggotaMutation.mutate(values);
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
          <PlusSquare className="w-6 h-6 me-4" /> Tambah Anggota Kelas
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tambah Anggota Kelas</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="nim"
              render={() => (
                <FormItem>
                  <FormLabel>Anggota Kelas</FormLabel>
                  <Popover open={openComboBox} onOpenChange={setOpenComboBox}>
                    <PopoverTrigger asChild className="w-full">
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn("w-full justify-between")}
                        >
                          {mahasiswaSelected
                            ? mahasiswa.find(
                                (ps) => ps.nama === mahasiswaSelected
                              )?.nama
                            : "Pilih mahasiswa"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="cari peserta" />
                        <CommandEmpty>Dosen tidak ditemukan</CommandEmpty>
                        <CommandGroup>
                          {mahasiswa.map((mahasiswa) => (
                            <CommandItem
                              value={mahasiswa.nama}
                              key={mahasiswa.nim}
                              onSelect={(currentDosen) => {
                                setMahasiswaSelected(
                                  currentDosen === mahasiswa.nama
                                    ? ""
                                    : mahasiswa.nama
                                );
                                form.setValue("nim", mahasiswa.nim);
                                setOpenComboBox(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  mahasiswa.nama === mahasiswaSelected
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {mahasiswa.nama}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={anggotaMutation.isPending}>
                {anggotaMutation.isPending ? "Menyimpan" : "Simpan"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default AddAnggota;
