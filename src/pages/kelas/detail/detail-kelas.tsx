import { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Wrapper from "~/components/layout/wrapper";

import Pembelajaran from "./pembelajaran/pembelajaran";

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
        <Pembelajaran />
      </KelasContext.Provider>
    </Wrapper>
  );
}

export default DetailKelas;
