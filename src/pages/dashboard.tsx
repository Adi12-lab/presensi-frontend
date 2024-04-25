import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";

import Wrapper from "~/components/layout/wrapper";
import { Anchor } from "~/components/ui/anchor";
import { AuthContext } from "~/context/auth";
import { axiosInstance } from "~/lib/utils";
export default function Dashboard() {
  const { akun } = useContext(AuthContext);
  const { data: detailAkun } = useQuery({
    queryKey: ["detail-akun"],
    queryFn: async () => {
      return (await axiosInstance.get(`akun/detail-akun`)).data;
    },
    staleTime: Infinity,
    enabled: !!akun,
  });
  return (
    <Wrapper>
      <h1 className="font-bold text-2xl">Selamat datang {akun.role}</h1>
      {detailAkun && (
        <table className="w-full mt-4">
          <tbody>
            <tr>
              <td className="w-[70px]">
                {akun.role === "dosen"
                  ? "NIP"
                  : akun.role === "mahasiswa"
                  ? "NIM"
                  : "username"}
              </td>
              <td>:</td>
              <td>{detailAkun.akunUsername}</td>
            </tr>
            <tr>
              <td>Nama</td>
              <td>:</td>
              <td>{detailAkun.nama}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>:</td>
              <td>{detailAkun.email}</td>
            </tr>
            <tr>
              <td>Gender</td>
              <td>:</td>
              <td>
                {detailAkun.kelamin === "P" ? "Perempuan" : "Laki - laki"}
              </td>
            </tr>
          </tbody>
        </table>
      )}
      <div className="mt-4">
        <h1 className="font-bold text-lg">Pertemuan Aktif</h1>
        <div className="grid grid-cols-3 mt-3">
          <div className="border-2 border-blue-400 shadow-lg p-5 text-center rounded-xl">
            <h4 className="font-semibold text-[19px] uppercase">Matakuliah</h4>
            <span className="text-[14px]">Tanggal</span>
            <h5 className="text-[17px] font-medium">&#034; Judul Pertemuan &#034;</h5>
            <p className="mt-2 text-[14px]">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi, in.</p>
            <Anchor className="uppercase mt-3 tracking-widest" href="">
              join pertemuan
            </Anchor>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
