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
export type AkunSafe = Omit<Akun, "password">;
export type AkunEdit = z.infer<typeof akunSchemaEdit>;

export const prodiSchema = z.object({
  kode: z.string().length(10, { message: "Kode harus 10 karakter" }),
  nama: z.string().min(1, { message: "Nama prodi harus ada" }),
});
export type Prodi = z.infer<typeof prodiSchema>;

export const matakuliahSchema = z.object({
  kode: z.string().min(2, { message: "Kode Matakuliah harus ada" }),
  nama: z.string().min(1, { message: "Nama Matakuliah harus ada" }),
});
export type Matakuliah = z.infer<typeof matakuliahSchema>;

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
  kelamin: z.enum(["P", "L"]),
  akunUsername: z.string().optional(),
  kelasKode: z.string().optional(),
});

export type Mahasiswa = z.infer<typeof mahasiswaSchema>;

export const dosenSchema = z.object({
  nidn: z.string().length(10, { message: "NIDN harus 10 karakter" }),
  nama: z.string().min(2, { message: "Nama mahasiswa harus ada" }),
  email: z
    .string()
    .email({ message: "Email tidak valid" })
    .min(2, { message: "Email harus ada" }),
  kelamin: z.enum(["P", "L"]),
  akunUsername: z.string().optional(),
  kelasKode: z.string().optional(),
});

export type Dosen = z.infer<typeof dosenSchema>;

export const pembelajaranSchema = z.object({
  kelasKode: z.string().min(10, { message: "Kelas harus ada dan valid" }),
  matakuliahKode: z.string().min(2, { message: "Matakuliah harus ada" }),
  tahunPembelajaran: z
    .string()
    .min(2, { message: "Tahun Pembelajaran harus ada" }),
  semester: z.number({ required_error: "Semester harus ada" }),
  totalJam: z.number({ required_error: "Total jam pembelajaran harus ada" }),
  sks: z.number({ required_error: "Sks harus ada" }),
  dosenNidn: z.string().length(10, { message: "Dosen harus ada dan valid" }),
});

export type NewPembelajaran = z.infer<typeof pembelajaranSchema>;
export type Pembelajaran = NewPembelajaran & { id: number };
export type PembelajaranComplete = Pembelajaran & {
  matakuliah: Matakuliah;
  dosen: Dosen;
};

export const anggotaKelasSchema = mahasiswaSchema
  .pick({ nim: true })

export type AnggotaKelas = z.infer<typeof anggotaKelasSchema>;