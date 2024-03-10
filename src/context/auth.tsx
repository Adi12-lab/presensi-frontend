import { createContext, useState} from "react";
import { User } from "~/schema";



export const AuthContext = createContext<AuthContextType>({
  user: {
    id: "",
    role: "mahasiswa",
    username: "",
  },
  setUser: () => {},
});
export type AuthContextType = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
};

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User>({
    id: "",
    role: "mahasiswa",
    username: "",
  });
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}