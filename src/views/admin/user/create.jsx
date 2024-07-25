import { Link, useNavigate } from "react-router-dom";
import Api from "../../../services/api";
import Navbar from "../../../components/Navbar";
import SidebarMenu from "../../../components/SidebarMenu";
import { useState } from "react";

export default function UserCreate() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [kode, setKode] = useState("");
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const storeUser = async (e) => {
    e.preventDefault();

    Api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    await Api.post("/api/admin/user/store", {
      kode: kode,
      nama: nama,
      email: email,
      password: password,
      role: role,
    })
      .then(() => {
        navigate("/admin/user");
      })
      .catch((error) => {
        console.error("Gagal menambahkan user", error);
      });
  };

  return (
    <>
      <Navbar />
      <div className="container mb-5 mt-5">
        <div className="row">
          <div className="col-md-3">
            <SidebarMenu />
          </div>
          <div className="col-md-9">
            <div className="card border-0 rounded shadow-sm">
              <div className="card-header fw-bold">Tambah User</div>
              <div className="card-body">
                <form onSubmit={storeUser}>
                  <div className="row">
                    {/* <div className="form-group mb-3">
                    <label className="mb-1 fw-bold">Kode :</label>
                    <input
                      type="text"
                      value={kode}
                      onChange={(e) => setKode(e.target.value)}
                      className="form-control"
                      readOnly
                    />
                  </div> */}
                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <label className="mb-1 fw-semibold">Nama :</label>
                        <input
                          type="text"
                          value={nama}
                          onChange={(e) => setNama(e.target.value)}
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <label className="mb-1 fw-semibold">Role :</label>
                        <select
                          className="form-select"
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                        >
                          <option value="" disabled>
                            Pilih Role...
                          </option>
                          <option value="admin">Admin</option>
                          <option value="supplier">Supplier</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <label className="mb-1 fw-semibold">Email :</label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <label className="mb-1 fw-semibold">Password :</label>
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-sm btn-primary">
                    Simpan
                  </button>
                  <Link to="/admin/user" className="mx-2 btn btn-sm btn-secondary">
                    Kembali
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
