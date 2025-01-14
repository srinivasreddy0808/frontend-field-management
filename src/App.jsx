import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./features/authentication/Login";
import Signup from "./features/authentication/Signup";
import AuthProvider from "./contexts/authContext/AuthProvider";
import PrivateRoute from "./components/PrivateRoute";
import Layout from "./components/Layout";
import Dashboard from "./features/dashboard/Dashboard";
import Subscription from "./features/subscription/Subscription";
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          <Route element={<PrivateRoute />}>
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/subscription" element={<Subscription />} />
            </Route>
          </Route>

          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
