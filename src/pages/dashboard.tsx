import { useContext } from "react";

import Wrapper from "~/components/layout/wrapper";
import { AuthContext } from "~/context/auth";
export default function Dashboard() {
  const { user } = useContext(AuthContext);
  return (
    <Wrapper>
        <h1 className="font-bold text-2xl">Selamat datang {user.role}</h1>
    </Wrapper>
  );
}