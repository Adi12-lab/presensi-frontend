import { createContext, useState } from "react";
import { AkunSafe } from "~/schema";

export const AuthContext = createContext<AuthContextType>({
  akun: {
    role: "mahasiswa",
    username: "",
    isActive: false
  },
  setUser: () => {},
});
export type AuthContextType = {
  akun: AkunSafe;
  setUser: React.Dispatch<React.SetStateAction<AkunSafe>>;
};

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [akun, setUser] = useState<AkunSafe>({
    role: "mahasiswa",
    username: "",
    isActive: false,
  });
  return (
    <AuthContext.Provider value={{ akun, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
