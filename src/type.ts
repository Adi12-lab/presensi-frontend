import { AnggotaKelas, NewPembelajaran, Pembelajaran } from "./schema";
export type EditDeleteOperation = "edit" | "delete";

export type ModalProps<K, T> = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  operation: K;
  data: T;
};

export type ComboBoxFor = NewPembelajaran | Pembelajaran | AnggotaKelas;
