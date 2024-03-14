import { useContext } from "react";

import Wrapper from "~/components/layout/wrapper";
import { AuthContext } from "~/context/auth";
export default function Dashboard() {
  const { akun } = useContext(AuthContext);
  return (
    <Wrapper>
      <h1 className="font-bold text-2xl">
        Selamat datang {akun.role}
      </h1>
    </Wrapper>
  );
}
