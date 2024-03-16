import { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Wrapper from "~/components/layout/wrapper";

import Pembelajaran from "./pembelajaran/pembelajaran";
import Anggota from "./anggota/anggota";

export const KelasContext = createContext("");

function DetailKelas() {
  const { kode } = useParams();
  const [kodeKelas, setKodeKelas] = useState("");

  useEffect(() => {
    setKodeKelas(kode as string);
  }, [kode]);

  return (
    <Wrapper>
      <h1>Detail Kelas</h1>
      <KelasContext.Provider value={kodeKelas}>
        <div>
          <h2 className="font-bold text-xl">Daftar matakuliah</h2>
          <Pembelajaran />
        </div>
        <div className="mt-4">
          <h2 className="font-bold text-xl">Anggota Kelas</h2>
          <Anggota />
        </div>
      </KelasContext.Provider>
    </Wrapper>
  );
}

export default DetailKelas;
