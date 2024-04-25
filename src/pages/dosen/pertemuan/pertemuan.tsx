import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { formatTanggal } from "~/lib/utils";
import ServicePertemuan from "~/actions/pertemuan";
import Presensi from "./presensi/presensi";
import Wrapper from "~/components/layout/wrapper";

export default function Pertemuan() {
  const { kelas, pertemuan } = useParams();
  const { data } = useQuery({
    queryKey: ["pertemuan"],
    queryFn: async () => {
      return ServicePertemuan.find(Number(pertemuan));
    },
    enabled: !!pertemuan,
    staleTime: Infinity
  });

  return (
    data && (
      <Wrapper>
        <section>
          <h1 className="font-bold text-lg my-2">Detail Pertemuan</h1>
          <table>
            <tbody>
              <tr>
                <td width={200}>Pertemuan ke</td>
                <td width={30}>:</td>
                <td>{data.pertemuanKe}</td>
              </tr>
              <tr>
                <td>Judul Materi</td>
                <td>:</td>
                <td>{data.judulMateri}</td>
              </tr>
              <tr>
                <td>Deskripsi Materi</td>
                <td>:</td>
                <td>
                  <p>{data.deskripsiMateri}</p>
                </td>
              </tr>
              <tr>
                <td>Tanggal</td>
                <td>:</td>
                <td>
                  <p>{formatTanggal(new Date(data.tanggal))}</p>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
        <section className="mt-3">
          <Presensi
            kelas={kelas as string}
            totalJam={data.pembelajaran.totalJam}
            pertemuan={data.id}
          />
        </section>
      </Wrapper>
    )
  );
}
