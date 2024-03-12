import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import ProtectedRoute from "./components/layout/protected-route";

const Login = lazy(() => import("./pages/login"));
const Dashboard = lazy(() => import("./pages/dashboard"));

//Admin
const Prodi = lazy(() => import("./pages/prodi/prodi"));
const Akun = lazy(() => import("./pages/akun/akun"));

//Admin dan Dosen
const Kelas = lazy(()=> import('./pages/kelas/kelas'))

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback="loading">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute roles={["admin"]} />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/akun" element={<Akun />} />
            <Route path="/prodi" element={<Prodi />} />
            <Route path="/prodi/:prodi/kelas" element={<Kelas />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
