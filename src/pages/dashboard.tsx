import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";

import Wrapper from "~/components/layout/wrapper";
import { Anchor } from "~/components/ui/anchor";
import { AuthContext } from "~/context/auth";
import { axiosInstance, formatTanggal } from "~/lib/utils";
import { Kelas, Matakuliah, Pertemuan } from "~/schema";
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
      {(akun.role === "mahasiswa" || akun.role === "dosen") && (
        <ActivePertemuan role={akun.role} />
      )}
    </Wrapper>
  );
}

function ActivePertemuan({ role }: { role: "mahasiswa" | "dosen" }) {
  const { data } = useQuery<
    { matakuliah: Matakuliah; pertemuan: Pertemuan; kelas?: Kelas }[]
  >({
    queryKey: ["active-pertemuan"],
    queryFn: async () => {
      return axiosInstance
        .get("/pertemuan/active-pertemuan")
        .then((data) => data.data);
    },
  });
  return (
    (data && data.length > 0) && (
      <div className="mt-4">
        <h1 className="font-bold text-lg">Pertemuan Aktif</h1>
        <div className="grid md:grid-cols-3 mt-3">
          {data.map((per) => (
            <div className="border-2 border-blue-400 shadow-lg p-5 text-center rounded-xl">
              <h4 className="font-semibold text-[19px] uppercase">
                {per.matakuliah.nama}
              </h4>
              <span className="text-[14px]">
                {formatTanggal(new Date(per.pertemuan.tanggal))}
              </span>
              <h5 className="text-[17px] font-medium">
                &#034; {per.pertemuan.judulMateri} &#034;
              </h5>
              <p className="mt-2 text-[14px]">
                {per.pertemuan.deskripsiMateri}
              </p>
              {role === "dosen" && <p>{per.kelas?.nama}</p>}
              <Anchor
                className="uppercase mt-3 tracking-widest"
                href={
                  role === "dosen"
                    ? `/dosen/kelas/${per.kelas?.kode}/play-presensi?pertemuan=${per.pertemuan.id}`
                    : `/mahasiswa/pertemuan/${per.pertemuan.id}`
                }
              >
                join pertemuan
              </Anchor>
            </div>
          ))}
        </div>
      </div>
    )
  );
}

export { ActivePertemuan };
