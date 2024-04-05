import { Route } from "react-router-dom";
import { lazy } from "react";
import SocketProvider from "~/context/socket";

const Kelas = lazy(() => import("~/pages/dosen/kelas/kelas"));
const Matakuliah = lazy(() => import("~/pages/dosen/matakuliah/matakuliah"));
const Pembelajaran = lazy(
  () => import("~/pages/dosen/pembelajaran/pembelajaran")
);
const AddPertemuan = lazy(
  () => import("~/pages/dosen/pembelajaran/pertemuan/add-pertemuan")
);
const PlayPresensi = lazy(
  () => import("~/pages/dosen/play-presensi/play-presensi")
);
function RouteForDosen() {
  return (
    <Route>
      <Route path="matakuliah">
        <Route path="" element={<Matakuliah />} />
        <Route path=":matakuliah/kelas" element={<Kelas />} />
      </Route>
      <Route path="pembelajaran">
        <Route path=":pembelajaran" element={<Pembelajaran />} />
        <Route path=":pembelajaran/add-pertemuan" element={<AddPertemuan />} />
      </Route>
        <Route path="pertemuan/:pertemuan" />
      <Route path="kelas">
        <Route
          path=":kelas/play-presensi"
          element={
            <SocketProvider>
              <PlayPresensi />
            </SocketProvider>
          }
        />
      </Route>
    </Route>
  );
}

export default RouteForDosen;
