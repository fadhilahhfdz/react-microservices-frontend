import { useEffect, useState } from "react";
import Api from "../../services/api";
import SidebarMenu from "../../components/SidebarMenu";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

export default function SupplierIndex() {
  const [supplier, setSupplier] = useState([]);

  const fetchDataSupplier = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      Api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      try {
        const response = await Api.get("/api/supplier");

        setSupplier(response.data);
      } catch (error) {
        console.error("Terjadi error ketika fetching data supplier", error);
      }
    } else {
      console.error("Token invalid");
    }
  };

  useEffect(() => {
    fetchDataSupplier();
  }, []);

  const deleteSupplier = async (id) => {
    const token = localStorage.getItem("token");

    if (token) {
      Api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      try {
        await Api.delete(`/api/supplier/${id}`);

        fetchDataSupplier();
      } catch (error) {
        console.error("Gagal menghapus data supplier", error);
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
                <span>Supplier</span>
                <Link
                  to="/supplier/create"
                  className="btn btn-sm btn-success rounded shadow-sm border-0"
                >
                  Tambah Supplier
                </Link>
              </div>
              <div className="card-body">
                <table className="table table-bordered">
                  <thead className="bg-primary text-white">
                    <tr>
                      <th scope="col" className="text-center" style={{width: "5%"}}>No</th>
                      <th scope="col">Nama Supplier</th>
                      <th scope="col">Nama Barang</th>
                      <th scope="col">Harga</th>
                      <th scope="col" style={{ width: "17%" }}>
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {supplier.length > 0 ? (
                      supplier.map((suppliers, index) => (
                        <tr key={index}>
                          <td className="text-center">{index + 1}</td>
                          <td>{suppliers.nama}</td>
                          <td>{suppliers.nama_barang}</td>
                          <td>Rp{suppliers.harga}</td>
                          <td className="text-center">
                            <Link
                              to={`/supplier/edit/${suppliers.id}`}
                              className="btn btn-sm btn-warning text-white rounded-sm border-0 me-2"
                            >
                              Edit
                            </Link>
                            <button
                              onClick={() => deleteSupplier(suppliers.id)}
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
