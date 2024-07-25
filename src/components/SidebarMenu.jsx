import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function SidebarMenu() {

  const [user, setUser] = useState([]);

  useEffect(() => {
    const userData = localStorage.getItem("user");

    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <div className="card border-0 rounded shadow-sm">
      <div className="card-header fw-bold">Navigasi</div>
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
              to="/admin/supplier"
              className="list-group-item list-group-item-action"
            >
              Supplier
            </Link>
            <Link
              to="/admin/barang"
              className="list-group-item list-group-item-action"
            >
              barang
            </Link>
            <Link
              to="/admin/user"
              className="list-group-item list-group-item-action"
            >
              User
            </Link>
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
          </div>
        )}
      </div>
    </div>
  );
}
