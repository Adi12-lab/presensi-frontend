import { create } from "zustand";
import { Presensi } from "~/schema";

type DataType = Pick<Presensi, "jenis" | "id" | "mahasiswaNim" | "pertemuanId">;

interface PresensiState {
  data: DataType;
  setData: (data: DataType) => void;
}

export const usePresensiStore = create<PresensiState>((set) => ({
  data: {
    id: 0,
    pertemuanId: 0,
    jenis: "masuk",
    mahasiswaNim: "",
  },
  setData: (data) => set((state) => ({ ...state, data })),
}));

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const useSimpleModal = create<ModalProps>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => set(() => ({ isOpen })),
}));
