import { z } from "zod";

export const authSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Username diperlukan" })
    .max(50, { message: "Username terlalu panjang" }),
  password: z.string().min(8, { message: "Password minimal 8 karakter" }),
});

export type Role = "admin" | "dosen" | "mahasiswa";

export type User = {
  username: string;
  id: string;
  role: Role;
};
