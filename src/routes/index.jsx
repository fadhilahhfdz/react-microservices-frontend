import { Navigate, Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Home from "../views/home";
import Register from "../views/auth/Register";
import Login from "../views/auth/Login";
import Dashboard from "../views/auth/Dashboard";
import SupplierIndex from "../views/supplier";
import SupplierCreate from "../views/supplier/create";
import SupplierEdit from "../views/supplier/edit";

export default function AppRoutes() {

    const {isAuthenticated} = useContext(AuthContext);

  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/admin/dashboard" replace /> : <Login />} />
        <Route path="/register" element={isAuthenticated ? <Navigate to="/admin/dashboard" replace /> : <Register />} />

        {/* Route Admin */}
        <Route path="/admin/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />} />

        {/* Route Supplier */}
        <Route path="/supplier/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />} />
        <Route path="/supplier/supplier" element={isAuthenticated ? <SupplierIndex /> : <Navigate to="/login" replace />} />
        <Route path="/supplier/create" element={isAuthenticated ? <SupplierCreate /> : <Navigate to="/login" replace />} />
        <Route path="/supplier/edit/:id" element={isAuthenticated ? <SupplierEdit /> : <Navigate to="/login" replace />} />
    </Routes>
  );
}
