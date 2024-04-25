import { createContext, useState } from "react";
export const SemesterContext = createContext<SemesterContextType>({
  semester: 1,
  setSemester: () => {},
});

export type SemesterContextType = {
  semester: number;
  setSemester: React.Dispatch<React.SetStateAction<number>>;
};

export default function SemesterProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [semester, setSemester] = useState(1);
  return (
    <SemesterContext.Provider value={{ semester, setSemester }}>
      {children}
    </SemesterContext.Provider>
  );
}
