import { useQuery } from "@tanstack/react-query";
import ServicePembelajaran from "~/actions/pembelajaran";
function Pembelajaran({ pembelajaran }: { pembelajaran: string }) {
  const { data } = useQuery({
    queryKey: ["pembelajaran", pembelajaran],
    queryFn: async () => {
      return ServicePembelajaran.find(Number(pembelajaran));
    },
  });
  return data &&(
    <>
      <h2 className="font-bold text-xl">Detail Pembelajaran</h2>
      <table className="mt-4">
        <tbody>
          <tr>
            <td className="w-[180px]">Kelas</td>
            <td className="w-[1rem]">:</td>
            <td>{data.kelas.nama}</td>
          </tr>
          <tr>
            <td>Matakuliah</td>
            <td>:</td>
            <td>{data.matakuliah.nama}</td>
          </tr>
          <tr>
            <td>Semester</td>
            <td>:</td>
            <td>{data.semester}</td>
          </tr>
          <tr>
            <td>Tahun Pembelajaran</td>
            <td>:</td>
            <td>{data.tahunPembelajaran}</td>
          </tr>
          <tr>
            <td>Sks</td>
            <td>:</td>
            <td>{data.sks}</td>
          </tr>
          <tr>
            <td>Total Jam</td>
            <td>:</td>
            <td>{data.totalJam} Jam</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default Pembelajaran;
