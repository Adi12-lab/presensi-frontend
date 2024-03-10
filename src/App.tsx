import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import ProtectedRoute from "./components/layout/protected-route";

const Login = lazy(() => import("./pages/login"));
const Dashboard = lazy(() => import("./pages/dashboard"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback='loading'>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute roles={["admin"]} />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
