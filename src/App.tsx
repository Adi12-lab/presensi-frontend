import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import ProtectedRoute from "./components/layout/protected-route";

const Login = lazy(() => import("./pages/login"));
const Dashboard = lazy(() => import("./pages/dashboard"));
import RouteForAdmin from "./routes/admin";
import RouteForDosen from "./routes/dosen";

//Admin

//Dosen

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback="loading">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute roles={["admin", "dosen"]} />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          <Route path="/admin" element={<ProtectedRoute roles={["admin"]} />}>
            {RouteForAdmin()}
          </Route>

          <Route path="/dosen" element={<ProtectedRoute roles={["dosen"]} />}>
            {RouteForDosen()}
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
