import React, { useEffect } from "react";

import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { ChevronsUpDown, Check, Loader2 } from "lucide-react";
import { cn } from "~/lib/utils";

import ServiceDosen from "~/actions/dosen";
import ServiceAkun from "~/actions/akun";

import { Akun, Dosen, dosenSchema } from "~/schema";

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

function EditDosen() {
  const { nidn } = useParams();
  const form = useForm<z.infer<typeof dosenSchema>>({
    resolver: zodResolver(dosenSchema),
    defaultValues: {
      nidn: "",
      nama: "",
      akunUsername: "",
      email: "",
      kelamin: "L",
    },
    mode: "onChange",
  });

  const akuns = useQuery<Akun[]>({
    queryKey: ["akun"],
    queryFn: ServiceAkun.dosen,
    staleTime: 1000 * 60 * 5,
  });

  const { data } = useQuery<Dosen>({
    queryKey: ["dosen"],
    queryFn: async () => {
      return await ServiceDosen.find(nidn as string);
    },
    enabled: nidn !== undefined,
  });
  useEffect(() => {
    if (data) {
      form.setValue("nidn", data.nidn);
      form.setValue("nama", data.nama);
      form.setValue("akunUsername", data.akunUsername);
      form.setValue("email", data.email);
      form.setValue("kelamin", data.kelamin);
    }
  }, [data, form]);

  const dosenMutation = useMutation({
    mutationKey: ["add-mahasiswa"],
    mutationFn: async (paylod: Dosen) => {
      return await ServiceDosen.update(nidn as string, paylod);
    },
    onSuccess: () => {
      window.location.href = "/admin/dosen";
    },
    onError: () => {
      toast.error("Dosen gagal diupdate");
    },
  });

  function onSubmit(values: Dosen) {
    dosenMutation.mutate(values);
    // console.log(values);
  }

  return (
    <Wrapper>
      <div>
        <h1  className="font-bold text-2xl">Edit Dosen</h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-5">
          <FormField
            control={form.control}
            name="nidn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>No NIP</FormLabel>
                <FormControl>
                  <Input
                    placeholder="NIP"
                    className="w-[300px]"
                    {...field}
                    disabled={dosenMutation.isPending}
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
                  <Input
                    placeholder="Nama"
                    {...field}
                    disabled={dosenMutation.isPending}
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
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="email"
                    {...field}
                    disabled={dosenMutation.isPending}
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
                <FormLabel>Gender</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={dosenMutation.isPending}
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
                  <PopoverTrigger asChild disabled={dosenMutation.isPending}>
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
            disabled={dosenMutation.isPending}
            type="submit"
          >
            {dosenMutation.isPending ? (
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

export default EditDosen;
