import { useParams } from "react-router-dom";
import DaftarPertemuan from "./daftar-pertemuan";
import DetailPembelajaran from "./detail-pembelajaran";
import Wrapper from "~/components/layout/wrapper";
function DetailPertemuan() {
  const { pembelajaran } = useParams();
  return (
    <Wrapper>
      <div className="mt-4">
        <DetailPembelajaran pembelajaran={pembelajaran as string} />
      </div>
      <div className="mt-4">
        <DaftarPertemuan pembelajaran={pembelajaran as string} />
      </div>
    </Wrapper>
  );
}

export default DetailPertemuan;
