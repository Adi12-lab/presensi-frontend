import { z } from "zod";

export const authSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Username diperlukan" })
    .max(50, { message: "Username terlalu panjang" }),
  password: z.string().min(8, { message: "Password minimal 8 karakter" }),
});

export type Role = "admin" | "dosen" | "mahasiswa";

export const akunSchema = z.object({
  username: z.string().min(2, { message: "Username diperlukan" }),
  password: z.string().min(8, { message: "Password minimal 8 karakter" }),
  isActive: z.boolean({ required_error: "Akun aktif atau tidak diperlukan" }),
  role: z.enum(["admin", "dosen", "mahasiswa"]),
});

export const akunSchemaEdit = z.object({
  username: z.string().min(2, { message: "Username diperlukan" }),
  password: z
    .string()
    .min(8, { message: "Password minimal 8 karakter" })
    .optional(),
  isActive: z.boolean({ required_error: "Akun aktif atau tidak diperlukan" }),
  role: z.enum(["admin", "dosen", "mahasiswa"]),
});

export type Akun = z.infer<typeof akunSchema>;

export type AkunWithPassword = Akun & { password: string };

export const prodiSchema = z.object({
  kode: z.string().length(10, { message: "Kode harus 10 karakter" }),
  nama: z.string().min(1, { message: "Nama prodi harus ada" }),
});
export type Prodi = z.infer<typeof prodiSchema>;

export const kelasSchema = z.object({
  nama: z.string().min(1, { message: "Nama kelas harus ada" }),
  angkatan: z.number({ required_error: "Angkatan harus ada" }),
  prodiKode: z.string().length(10, { message: "Kelas harus memiliki prodi" }),
});
export type NewKelas = z.infer<typeof kelasSchema>;
export type Kelas = NewKelas & { kode: string };

export const mahasiswaSchema = z.object({
  nim: z.string().length(10, { message: "NIM harus 10 karakter" }),
  nama: z.string().min(2, { message: "Nama mahasiswa harus ada" }),
  email: z
    .string()
    .email({ message: "Email tidak valid" })
    .min(2, { message: "Email harus ada" }),
  kelamin: z.enum(["K"]),
  akunUsername: z
    .string()
    .min(2, { message: "Username tidak valid" })
    .optional(),
  kelasKode: z.string().min(2, { message: "Kelas mahasiswa harus ada" }),
});

export type Mahasiswa = z.infer<typeof mahasiswaSchema>;
