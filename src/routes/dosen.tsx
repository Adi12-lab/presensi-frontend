import { Route } from "react-router-dom";
import { lazy } from "react";
import Kelas from "~/pages/dosen/kelas/kelas";

const Matakuliah = lazy(() => import("../pages/dosen/matakuliah/matakuliah"));


function RouteForDosen() {
  return (
    <Route>
      <Route path="matakuliah" element={<Matakuliah />} />
      <Route path="matakuliah/:kode/kelas" element={<Kelas />}/>
    </Route>
  );
}

export default RouteForDosen;
