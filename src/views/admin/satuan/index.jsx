import { useEffect, useState } from "react";
import Api from "../../../services/api";
import Navbar from "../../../components/Navbar";
import { Link } from "react-router-dom";
import SidebarMenu from "../../../components/SidebarMenu";

export default function SatuanIndex() {
  const [satuan, setSatuan] = useState([]);

  const fetchDataSatuan = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      Api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      try {
        const response = await Api.get("api/admin/satuan");

        setSatuan(response.data);
      } catch (error) {
        console.error("Terjadi error ketika fetching data satuan", error);
      }
    } else {
      console.error("Token invalid");
    }
  };

  useEffect(() => {
    fetchDataSatuan();
  }, []);

  const deleteSatuan = async (id) => {
    const token = localStorage.getItem("token");

    if (token) {
      Api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      try {
        await Api.delete(`api/admin/satuan/${id}`);

        fetchDataSatuan();
      } catch (error) {
        console.error("Gagal menghapus data satuan");
      }
    } else {
      console.error("Token invalid");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5 mb-5">
        <div className="row">
          <div className="col-md-3">
            <SidebarMenu />
          </div>
          <div className="col-md-9">
            <div className="card border-0 rounded shadow-sm">
              <div className="card-header d-flex justify-content-between align-items-center">
                <span className="fw-bold">Satuan</span>
                <Link
                  to="/admin/satuan/create"
                  className="btn btn-sm btn-success rounded shadow-sm border-0"
                >
                  Tambah Satuan
                </Link>
              </div>
              <div className="card-body">
                <table className="table table-bordered">
                  <thead className="bg-primary text-white">
                    <tr>
                      <th
                        scope="col"
                        className="text-center fw-semibold"
                        style={{ width: "7%" }}
                      >
                        No
                      </th>
                      <th scope="col" className="fw-semibold">Nama Satuan</th>
                      <th style={{ width: "20%" }} className="text-center fw-semibold">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {satuan.length > 0 ? (
                      satuan.map((satuans, index) => (
                        <tr key={index}>
                          <td className="text-center">{index + 1}</td>
                          <td>{satuans.nama}</td>
                          <td className="text-center">
                            <Link
                              to={`/admin/satuan/edit/${satuans.id}`}
                              className="btn btn-sm btn-warning text-white rounded-sm border-0 me-2"
                            >
                              Edit
                            </Link>
                            <button
                              onClick={() => deleteSatuan(satuans.id)}
                              className="btn btn-sm btn-danger rounded-sm border-0"
                            >
                              Hapus
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center">
                          <div className="alert alert-danger mb-0">
                            Data belum tersedia!
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
