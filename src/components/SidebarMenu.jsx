import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function SidebarMenu() {
  const navigate = useNavigate();

  const { setIsAuthenticated } = useContext(AuthContext);

  const [user, setUser] = useState([]);

  useEffect(() => {
    const userData = localStorage.getItem("user");

    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setIsAuthenticated(false);

    navigate("/login", { replace: true });
  };

  return (
    <div className="card border-0 rounded shadow-sm">
      <div className="card-header">Navigasi</div>
      <div className="card-body">
        {user.role === "admin" && (
          <div className="list-group">
            <Link
              to="/admin/dashboard"
              className="list-group-item list-group-item-action"
            >
              Dashboard
            </Link>
            <Link
              to="/admin/kategori"
              className="list-group-item list-group-item-action"
            >
              Kategori
            </Link>
            <Link
              to="/admin/satuan"
              className="list-group-item list-group-item-action"
            >
              Satuan
            </Link>
            <Link
              to="/admin/barang"
              className="list-group-item list-group-item-action"
            >
              barang
            </Link>
            <Link
              to="/admin/supplier"
              className="list-group-item list-group-item-action"
            >
              Supplier
            </Link>
            <Link
              to="/admin/users"
              className="list-group-item list-group-item-action"
            >
              User
            </Link>
            <a
              onClick={logout}
              className="list-group-item list-group-item-action"
              style={{ cursor: "pointer" }}
            >
              Logout
            </a>
          </div>
        )}
        {user.role === "supplier" && (
          <div className="list-group">
            <Link
              to="/supplier/dashboard"
              className="list-group-item list-group-item-action"
            >
              Dashboard
            </Link>
            <Link
              to="/supplier/supplier"
              className="list-group-item list-group-item-action"
            >
              Supplier
            </Link>
            <a
              onClick={logout}
              className="list-group-item list-group-item-action"
              style={{ cursor: "pointer" }}
            >
              Logout
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
