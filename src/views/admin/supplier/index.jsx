import { useEffect, useState } from "react";
import Api from "../../../services/api";
import Navbar from "../../../components/Navbar";
import SidebarMenu from "../../../components/SidebarMenu";

export default function AdminSupplierIndex() {
  
  const [supplier, setSupplier] = useState([]);

  const fetchDataSupplier = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      Api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      try {
        const response = await Api.get("/api/admin/supplier");

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
                <span className="fw-bold">Supplier</span>
              </div>
              <div className="card-body">
                <table className="table table-bordered">
                  <thead className="bg-primary text-white">
                    <tr>
                      <th scope="col" className="text-center" style={{width: "5%"}}>No</th>
                      <th scope="col" className="fw-semibold">Nama Supplier</th>
                      <th scope="col" className="fw-semibold">Nama Barang</th>
                      <th scope="col" className="fw-semibold">Harga</th>
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
