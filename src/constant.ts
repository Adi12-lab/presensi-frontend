import { JenisPresensiProps } from "./type";
import { JenisPresensi } from "./schema";
export const jenisPresensi: Record<JenisPresensi, JenisPresensiProps> = {
    masuk: {
      variant: "success",
      label: "P",
    },
    alpha: {
      variant: "destructive",
      label: "A",
    },
    sakit: {
      variant: "default",
      label: "S",
    },
    izin: {
      variant: "secondary",
      label: "I",
    },
  };