import { Link, useNavigate } from "react-router-dom";
import Api from "../../../services/api";
import SidebarMenu from "../../../components/SidebarMenu";
import Navbar from "../../../components/Navbar";
import { useEffect, useState } from "react";

export default function BarangCreate() {
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  const [kode, setKode] = useState("");
  const [nama, setNama] = useState("");
  const [kategori, setKategori] = useState([]);
  const [satuan, setSatuan] = useState([]);
  const [supplier, setSupplier] = useState([]);
  const [selectKategori, setSelectKategori] = useState("");
  const [selectSatuan, setSelectSatuan] = useState("");
  const [selectSupplier, setSelectSupplier] = useState("");
  const [harga, setHarga] = useState("");
  const [stok, setStok] = useState("");

  const fetchDataKategori = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      Api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      try {
        const response = await Api.get("/api/admin/kategori");

        setKategori(response.data);
      } catch (error) {
        console.error("Terjadi error ketika fetching data kategori", error);
      }
    } else {
      console.error("Token invalid");
    }
  };

  useEffect(() => {
    fetchDataKategori();
  }, []);

  const fetchDataSatuan = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      Api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      try {
        const response = await Api.get("/api/admin/satuan");

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

  const storeBarang = async (e) => {
    e.preventDefault();

    Api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    await Api.post("/api/admin/barang/store", {
      kode: kode,
      nama: nama,
      id_kategori: selectKategori,
      id_satuan: selectSatuan,
      id_supplier: selectSupplier,
      harga: harga,
      stok: stok,
    })
      .then(() => {
        navigate("/admin/barang");
      })
      .catch((error) => {
        console.error("Gagal menambahkan barang", error);
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
              <div className="card-header fw-bold">Tambah Barang</div>
              <div className="card-body">
                <form onSubmit={storeBarang}>
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
                        <label className="mb-1 fw-semibold">
                          Nama Barang :
                        </label>
                        <input
                          type="text"
                          value={nama}
                          onChange={(e) => setNama(e.target.value)}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <label className="mb-1 fw-semibold">Kategori :</label>
                        <select
                          className="form-select"
                          value={selectKategori}
                          onChange={(e) => setSelectKategori(e.target.value)}
                          required
                        >
                          <option value="" disabled>Pilih Kategori</option>
                          {kategori.map((kategoris) => (
                            <option key={kategoris.id} value={kategoris.id}>
                              {kategoris.nama}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <label className="mb-1 fw-semibold">Satuan :</label>
                        <select
                          className="form-select"
                          value={selectSatuan}
                          onChange={(e) => setSelectSatuan(e.target.value)}
                          required
                        >
                          <option value="" disabled>Pilih Satuan</option>
                          {satuan.map((satuans) => (
                            <option key={satuans.id} value={satuans.id}>
                              {satuans.nama}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <label className="mb-1 fw-semibold">Supplier :</label>
                        <select
                          className="form-select"
                          value={selectSupplier}
                          onChange={(e) => setSelectSupplier(e.target.value)}
                          required
                        >
                          <option value="" disabled>Pilih Suplier</option>
                          {supplier.map((suppliers) => (
                            <option key={suppliers.id} value={suppliers.id}>
                              {suppliers.nama}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <label className="mb-1 fw-semibold">
                          Harga Jual :
                        </label>
                        <input
                          type="text"
                          inputMode="numeric"
                          value={harga}
                          onChange={(e) => setHarga(e.target.value)}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <label className="mb-1 fw-semibold">
                          Stok :
                        </label>
                        <input
                          type="number"
                          value={stok}
                          onChange={(e) => setStok(e.target.value)}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-sm btn-primary">
                    Simpan
                  </button>
                  <Link to="/admin/barang" className="mx-2 btn btn-sm btn-secondary">
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
