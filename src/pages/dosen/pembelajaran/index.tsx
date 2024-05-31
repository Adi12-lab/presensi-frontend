import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import ServicePembelajaran from "~/actions/pembelajaran";
import { PembelajaranComplete } from "~/schema";

import Wrapper from "~/components/layout/wrapper";
import Pertemuan from "./pertemuan/pertemuan";
import Pembelajaran from "./pembelajaran";
export default function Index() {
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
        <div>
          <Pembelajaran pembelajaran={pembelajaran as string} />
        </div>
        <div className="mt-4">
          <Pertemuan
            kelas={data.kelas.kode}
            pembelajaran={parseInt(pembelajaran as string)}
          />
        </div>
      </Wrapper>
    )
  );
}
