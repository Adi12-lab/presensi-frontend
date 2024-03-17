import { Route } from "react-router-dom";
import { lazy } from "react";

const Prodi = lazy(() => import("../pages/admin/prodi/prodi"));
const Matakuliah = lazy(() => import("../pages/admin/matakuliah/matakuliah"));
const Akun = lazy(() => import("../pages/admin/akun/akun"));
const AddMahasiswa = lazy(
  () => import("../pages/admin/mahasiswa/add-mahasiswa")
);
const EditMahasiswa = lazy(
  () => import("../pages/admin/mahasiswa/edit-mahasiswa")
);
const Mahasiswa = lazy(() => import("../pages/admin/mahasiswa/mahasiswa"));
const Dosen = lazy(() => import("../pages/admin/dosen/dosen"));
const AddDosen = lazy(() => import("../pages/admin/dosen/add-dosen"));
const EditDosen = lazy(() => import("../pages/admin/dosen/edit-dosen"));
const Kelas = lazy(() => import("../pages/admin/kelas/kelas"));
const DetailKelas = lazy(
  () => import("../pages/admin/kelas/detail/detail-kelas")
);

function RouteForAdmin() {
  return (
    <Route>
      <Route path="akun" element={<Akun />} />
      <Route path="matakuliah" element={<Matakuliah />} />
      <Route path="prodi" element={<Prodi />} />
      <Route path="prodi/:prodi/kelas" element={<Kelas />} />

      <Route path="mahasiswa">
        <Route path="" element={<Mahasiswa />} />
        <Route path="add" element={<AddMahasiswa />} />
        <Route path=":nim/edit" element={<EditMahasiswa />} />
      </Route>

      <Route path="kelas/:kode" element={<DetailKelas />} />
      <Route path="dosen">
        <Route path="" element={<Dosen />} />
        <Route path="add" element={<AddDosen />} />
        <Route path=":nidn/edit" element={<EditDosen />} />
      </Route>
    </Route>
  );
}

export default RouteForAdmin;
