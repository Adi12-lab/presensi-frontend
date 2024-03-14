import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { ChevronsUpDown, Check, Loader2 } from "lucide-react";
import { cn } from "~/lib/utils";

import ServiceMahasiswa from "~/actions/mahasiswa";
import ServiceAkun from "~/actions/akun";

import { Akun, mahasiswaSchema, Mahasiswa } from "~/schema";

import Wrapper from "~/components/layout/wrapper";
import { Input } from "~/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Button } from "~/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "~/components/ui/popover";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "~/components/ui/command";
import { useNavigate } from "react-router-dom";

function AddMahasiswa() {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof mahasiswaSchema>>({
    resolver: zodResolver(mahasiswaSchema),
    defaultValues: {
      nim: "",
      nama: "",
      akunUsername: "",
      email: "",
      kelamin: "L",
    },
    mode: "onChange",
  });

  const mahasiswaMutation = useMutation({
    mutationKey: ["add-mahasiswa"],
    mutationFn: ServiceMahasiswa.create,
    onSuccess: () => {
      navigate("/mahasiswa");
    },
    onError: () => {
      toast.error("Mahasiswa gagal ditambahkan");
    },
  });

  const akuns = useQuery<Akun[]>({
    queryKey: ["akun"],
    queryFn: async ()=> {
      return await ServiceAkun.all('mahasiswa=true')
    },
    staleTime: 1000 * 60 * 5,
  });

  function onSubmit(values: Mahasiswa) {
    mahasiswaMutation.mutate(values);
    // console.log(values);
  }

  return (
    <Wrapper>
      <div>
        <h1>Tambah Mahasiswa</h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="nim"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nim Mahasiswa</FormLabel>
                <FormControl>
                  <Input
                    placeholder="NIM"
                    className="w-[300px]"
                    {...field}
                    disabled={mahasiswaMutation.isPending}
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
                <FormLabel>Nama Mahasiswa</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Nama"
                    {...field}
                    disabled={mahasiswaMutation.isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Mahasiswa</FormLabel>
                <FormControl>
                  <Input
                    placeholder="email"
                    {...field}
                    disabled={mahasiswaMutation.isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="kelamin"
            render={({ field }) => (
              <FormItem className="w-[200px]">
                <FormLabel>Jenis Kelamin</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={mahasiswaMutation.isPending}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="L">Laki - laki</SelectItem>
                    <SelectItem value="P">Perempuan</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="akunUsername"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Akun Username</FormLabel>
                <Popover>
                  <PopoverTrigger
                    asChild
                    disabled={mahasiswaMutation.isPending}
                  >
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-[200px] justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? akuns.data?.find(
                              (akun) => akun.username === field.value
                            )?.username
                          : "Pilih akun"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>

                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Cari Akun..." />
                      <CommandEmpty>Akun tidak ditemukan.</CommandEmpty>
                      <CommandGroup>
                        {akuns.data?.map((akun) => (
                          <CommandItem
                            key={akun.username + "combobox"}
                            value={akun.username}
                            onSelect={() => {
                              form.setValue("akunUsername", akun.username);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                akun.username === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {akun.username}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />

          <Button
            variant={"default"}
            disabled={mahasiswaMutation.isPending}
            type="submit"
          >
            {mahasiswaMutation.isPending ? (
              <React.Fragment>
                <Loader2 />
                Menyimpan
              </React.Fragment>
            ) : (
              "Simpan"
            )}
          </Button>
        </form>
      </Form>
    </Wrapper>
  );
}

export default AddMahasiswa;
