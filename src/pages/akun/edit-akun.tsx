import { useEffect } from "react";
import { z } from "zod";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import ServiceAkun from "~/actions/akun";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

import { Switch } from "~/components/ui/switch";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";

import { Akun, AkunWithPassword, akunSchema } from "~/schema";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import PasswordInput from "~/components/ui/password-input";
import { EditDeleteOperation, ModalProps } from "~/type";

function EditAkun({
  data,
  operation,
  isOpen,
  setIsOpen,
}: ModalProps<EditDeleteOperation, Akun>) {
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof akunSchema>>({
    resolver: zodResolver(akunSchema),
    defaultValues: {
      username: "",
      password: "",
      role: "mahasiswa",
    },
  });

  useEffect(() => {
    if (data) {
      form.setValue("username", data.username);
      form.setValue("role", data.role);
      form.setValue("isActive", data.isActive);
    }
  }, [data, form]);

  const editAkunMutation = useMutation({
    mutationKey: ["edit-akun"],
    mutationFn: async (payload: AkunWithPassword) => {
      return await ServiceAkun.update(data.username, payload);
    },
    onSuccess: (payload: Akun) => {
      toast.success(`Akun ${payload.username} berhasil diedit`);
      setIsOpen(false);
      queryClient.invalidateQueries({ queryKey: ["akun"] });
    },
    onError: () => {
      toast.error("Akun gagal ditambahkan");
    },
  });

  function onSubmit(values: AkunWithPassword) {
    editAkunMutation.mutate(values);
    // console.log(values);
  }
  return (
    <Dialog open={isOpen && operation === "edit"} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Akun</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih role untuk akun" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="mahasiswa">Mahasiswa</SelectItem>
                      <SelectItem value="dosen">Dosen</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status akun</FormLabel>
                  <FormControl className="mt-3">
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit" disabled={editAkunMutation.isPending}>
                {editAkunMutation.isPending ? "Menyimpan" : "Simpan"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default EditAkun;
