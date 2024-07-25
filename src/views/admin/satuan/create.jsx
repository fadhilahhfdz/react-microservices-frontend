import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Api from "../../../services/api";
import Navbar from "../../../components/Navbar";
import SidebarMenu from "../../../components/SidebarMenu";

export default function SatuanCreate() {
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  const [nama, setNama] = useState("");

  const storeSatuan = async (e) => {
    e.preventDefault();

    Api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    await Api.post("/api/admin/satuan/store", {
      nama: nama,
    })
      .then(() => {
        navigate("/admin/satuan");
      })
      .catch((error) => {
        console.error("Gagal menambahkan satuan", error);
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
              <div className="card-header fw-bold">Tambah Satuan</div>
              <div className="card-body">
                <form onSubmit={storeSatuan}>
                  <div className="form-group mb-3">
                    <label className="mb-1 fw-semibold">Nama Satuan</label>
                    <input
                      type="text"
                      value={nama}
                      onChange={(e) => setNama(e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <button type="submit" className="btn btn-sm btn-primary">
                    Simpan
                  </button>
                  <Link
                    to="/admin/satuan"
                    className="mx-2 btn btn-sm btn-secondary"
                  >
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
