import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import ServicePembelajaran from "~/actions/pembelajaran";
import { PembelajaranComplete } from "~/schema";

import Wrapper from "~/components/layout/wrapper";
import Pertemuan from "./pertemuan/pertemuan";
function Pembelajaran() {
  const { pembelajaran } = useParams();
  const { data } = useQuery<PembelajaranComplete>({
    queryKey: ["pembelajaran"],
    queryFn: async () => {
      return await ServicePembelajaran.find(parseInt(pembelajaran as string));
    },
  });

  return (
    data && (
      <Wrapper>
        <h1 className="font-bold text-xl">Pembelajaran</h1>
        <Pertemuan
          kelas={data.kelas.kode}
          pembelajaran={parseInt(pembelajaran as string)}
        />
      </Wrapper>
    )
  );
}

export default Pembelajaran;
