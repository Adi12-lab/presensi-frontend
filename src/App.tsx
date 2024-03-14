import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import ProtectedRoute from "./components/layout/protected-route";

const Login = lazy(() => import("./pages/login"));
const Dashboard = lazy(() => import("./pages/dashboard"));

//Admin
const Prodi = lazy(() => import("./pages/prodi/prodi"));
const Matakuliah = lazy(() => import("./pages/matakuliah/matakuliah"));
const Akun = lazy(() => import("./pages/akun/akun"));
const AddMahasiswa = lazy(() => import("./pages/mahasiswa/add-mahasiswa"));
const EditMahasiswa = lazy(() => import("./pages/mahasiswa/edit-mahasiswa"));
const Mahasiswa = lazy(() => import("./pages/mahasiswa/mahasiswa"));

const Dosen = lazy(() => import("./pages/dosen/dosen"));
const AddDosen = lazy(() => import("./pages/dosen/add-dosen"));

//Admin dan Dosen
const Kelas = lazy(() => import("./pages/kelas/kelas"));
const DetailKelas = lazy(() => import("./pages/kelas/detail/detail-kelas"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback="loading">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute roles={["admin", "dosen"]} />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          <Route element={<ProtectedRoute roles={["admin"]} />}>
            <Route path="/akun" element={<Akun />} />
            <Route path="/matakuliah" element={<Matakuliah />} />
            <Route path="/prodi" element={<Prodi />} />
            <Route path="/prodi/:prodi/kelas" element={<Kelas />} />

            <Route path="/mahasiswa">
              <Route path="" element={<Mahasiswa />} />
              <Route path="add" element={<AddMahasiswa />} />
              <Route path=":nim/edit" element={<EditMahasiswa />} />
            </Route>

            <Route path="/kelas/:kode" element={<DetailKelas />} />
            <Route path="/dosen">
              <Route path="" element={<Dosen />} />
              <Route path="add" element={<AddDosen />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
