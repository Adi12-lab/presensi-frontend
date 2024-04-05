import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function rgbToHex(rgb: string): string {
  // Memisahkan string RGB menjadi array
  const splitedRgb = rgb.split(",").map(Number);

  // Fungsi untuk mengubah satu nilai RGB menjadi Hex
  const toHex = (rgbValue: number): string => {
    const hex = rgbValue.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  };

  // Mengubah setiap nilai RGB menjadi Hex dan menggabungkannya
  const hexColor =
    "#" + toHex(splitedRgb[0]) + toHex(splitedRgb[1]) + toHex(splitedRgb[2]);

  return hexColor;
}
export function formatTanggal(date: Date) {
  const f = new Intl.DateTimeFormat("id-ID", {
    dateStyle: "full",
  });
  return f.format(date);
}

export function formatSeconds(seconds: number) {
  // Menghitung jumlah menit dan detik
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  // Memformat menit dan detik menjadi string dengan padding 0 jika perlu
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = remainingSeconds.toString().padStart(2, '0');

  // Menggabungkan menit dan detik dalam format MM.SS
  return `${formattedMinutes}:${formattedSeconds}`;
}

export function generateArrayNumber(length: number) {
  const array: number[] = [];
  for (let i = 1; i <= length; i++) {
    array.push(i);
  }
  return array;
}

import axios from "axios";
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

import { io } from "socket.io-client";
export const socket = io(import.meta.env.VITE_SERVER_URL, {
  autoConnect: false,
  transports: ["websocket"],
});
