import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import Wrapper from "~/components/layout/wrapper";

import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Calendar } from "~/components/ui/calendar";

import ServicePertemuan from "~/actions/pertemuan";
import { NewPertemuan, pertemuanSchema } from "~/schema";
import { generateArrayNumber } from "~/lib/utils";
function AddPertemuan() {
  const { pembelajaran } = useParams();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof pertemuanSchema>>({
    resolver: zodResolver(pertemuanSchema),
    defaultValues: {
      pertemuanKe: 0,
      deskripsiMateri: "",
      judulMateri: "",
      pembelajaranId: 0,
      tanggal: new Date(),
      timerPresensi: 0,
    },
  });


  useEffect(() => {
    if (form && pembelajaran) {
      form.setValue("pembelajaranId", parseInt(pembelajaran));
    }
  }, [form, pembelajaran]);
  
  const pertemuanMutation = useMutation({
    mutationKey: ["add-pertemuan"],
    mutationFn: ServicePertemuan.create,
    onSuccess: () => {
      navigate(`/dosen/pembelajaran/${pembelajaran}`);
    },
    onError: () => {
      toast.error("Pertemuan gagal ditambahkan");
    },
  });

  function onSubmit(values: NewPertemuan) {
    pertemuanMutation.mutate(values);
  }

  return (
    <Wrapper>
      <h1 className="font-bold bg-yellow-300 p-4 rounded-xl">
        Tambah Pertemuan
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 py-6">
          <FormField
            control={form.control}
            name="pertemuanKe"
            render={({ field }) => (
              <FormItem className="max-w-md">
                <FormLabel>Pilih pertemuan</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(value) => field.onChange(Number(value))}
                    value={field.value.toString()}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {generateArrayNumber(18).map((ptm) => (
                        <SelectItem key={ptm} value={`${ptm}`}>
                          Pertemuan {ptm}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="judulMateri"
            render={({ field }) => (
              <FormItem className="max-w-lg">
                <FormLabel>Judul Materi</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="deskripsiMateri"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Deskripsi Materi</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tanggal"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tanggal Pertemuan</FormLabel>
                <FormControl>
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="timerPresensi"
            render={({ field }) => (
              <FormItem className="max-w-sm">
                <FormLabel>Timer absensi</FormLabel>
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
          <Button
            variant={"default"}
            disabled={pertemuanMutation.isPending}
            type="submit"
          >
            {pertemuanMutation.isPending ? (
              <React.Fragment>
                <Loader2 className="animate-spin" />
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

export default AddPertemuan;
