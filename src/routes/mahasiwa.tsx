import { Route } from "react-router-dom";
import { lazy } from "react";

const Pembelajaran = lazy(
  () => import("~/pages/mahasiswa/pembelajaran/pembelajaran")
);
const Pertemuan = lazy(() => import("~/pages/mahasiswa/pertemuan/index"));
const JoinPertemuan = lazy(()=> import('~/pages/mahasiswa/join-pertemuan/join-pertemuan'))

export default function RouteForMahasiswa() {
  return (
    <Route>
      <Route path="pembelajaran">
        <Route path="" element={<Pembelajaran />} />
        <Route path=":pembelajaran" element={<Pertemuan />} />
      </Route>
      <Route path="pertemuan">
        <Route path="" element={<JoinPertemuan />} />
      </Route>
    </Route>
  );
}
