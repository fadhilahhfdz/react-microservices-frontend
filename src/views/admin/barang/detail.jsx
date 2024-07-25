import { useEffect, useState } from "react";
import Api from "../../../services/api";
import Navbar from "../../../components/Navbar";
import SidebarMenu from "../../../components/SidebarMenu";
import { useParams } from "react-router-dom";

export default function BarangDetail() {

  const { id } = useParams();

  const [barang, setBarang] = useState([]);
  const [kategori, setKategori] = useState([]);
  const [satuan, setSatuan] = useState([]);
  const [supplier, setSupplier] = useState([]);

  const fetchDetailBarang = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      Api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      try {
        const response = await Api.get(`/api/admin/barang/${id}`);

        setBarang(response.data.data.barang);
        setKategori(response.data.data.kategori);
        setSatuan(response.data.data.satuan);
        setSupplier(response.data.data.supplier);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    fetchDetailBarang(id);
  }, [id]);

  const getKategoriName = (id_kategori) => {
    const kat = kategori.find((k) => k.id === id_kategori);
    return kat ? kat.nama : "Null";
  };

  const getSatuanName = (id_satuan) => {
    const sat = satuan.find((s) => s.id === id_satuan);
    return sat ? sat.nama : "Null";
  };

  const getSupplierName = (id_supplier) => {
    const sup = supplier.find((s) => s.id === id_supplier);
    return sup ? sup.nama : "Null";
  };
  const getSupplierHarga = (id_supplier) => {
    const sup = supplier.find((s) => s.id === id_supplier);
    return sup ? sup.harga : "Null";
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
              <div className="card-header fw-bold">Detail Barang</div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label className="mb-1 fw-semibold">Kode :</label>
                      <input
                        type="text"
                        value={barang.kode}
                        className="form-control"
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label className="mb-1 fw-semibold">Nama Barang :</label>
                      <input
                        type="text"
                        value={barang.nama}
                        className="form-control"
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label className="mb-1 fw-semibold">Kategori :</label>
                      <input
                        type="text"
                        value={getKategoriName(barang.id_kategori)}
                        className="form-control"
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label className="mb-1 fw-semibold">Satuan :</label>
                      <input
                        type="text"
                        value={getSatuanName(barang.id_satuan)}
                        className="form-control"
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label className="mb-1 fw-semibold">Supplier :</label>
                      <input
                        type="text"
                        value={getSupplierName(barang.id_supplier)}
                        className="form-control"
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label className="mb-1 fw-semibold">Harga beli :</label>
                      <input
                        type="number"
                        value={getSupplierHarga(barang.id_supplier)}
                        className="form-control"
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label className="mb-1 fw-semibold">Harga Jual :</label>
                      <input
                        type="text"
                        value={barang.harga}
                        className="form-control"
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label className="mb-1 fw-semibold">Stok :</label>
                      <input
                        type="text"
                        value={barang.stok}
                        className="form-control"
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
