import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Api from "../../../services/api";
import Navbar from "../../../components/Navbar";
import SidebarMenu from "../../../components/SidebarMenu";

export default function EditBarang() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { id } = useParams();

  const [barang, setBarang] = useState({
    kode: "",
    nama: "",
    id_kategori: "",
    id_satuan: "",
    id_supplier: "",
    harga: "",
    stok: "",
  });

  const [kategori, setKategori] = useState([]);
  const [satuan, setSatuan] = useState([]);
  const [supplier, setSupplier] = useState([]);

  const fetchDetailBarang = async () => {
    Api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    try {
      const response = await Api.get(`/api/admin/barang/${id}`);
      setBarang(response.data.data.barang);
      setKategori(response.data.data.kategori || []);
      setSatuan(response.data.data.satuan || []);
      setSupplier(response.data.data.supplier || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDetailBarang();
  }, [id]);

  const handleChange = (e) => {
    setBarang({ ...barang, [e.target.name]: e.target.value });
  };

  const updateBarang = async (e) => {
    e.preventDefault();
    Api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    try {
      await Api.put(`/api/admin/barang/${id}`, barang);
      navigate("/admin/barang"); 
    } catch (error) {
      console.error("Gagal edit data barang", error);
    }
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
              <div className="card-header fw-bold">Edit Barang</div>
              <div className="card-body">
                <form onSubmit={updateBarang}>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group mb-3">
                        <label className="mb-1 fw-semibold">Kode :</label>
                        <input
                          type="text"
                          name="kode"
                          value={barang.kode}
                          onChange={handleChange}
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
                          name="nama"
                          value={barang.nama}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <label className="mb-1 fw-semibold">Kategori :</label>
                        <select
                          name="id_kategori"
                          value={barang.id_kategori}
                          onChange={handleChange}
                          className="form-select"
                        >
                          {kategori.map((k) => (
                            <option key={k.id} value={k.id}>
                              {k.nama}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <label className="mb-1 fw-semibold">Satuan :</label>
                        <select
                          name="id_satuan"
                          value={barang.id_satuan}
                          onChange={handleChange}
                          className="form-select"
                        >
                          {satuan.map((s) => (
                            <option key={s.id} value={s.id}>
                              {s.nama}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <label className="mb-1 fw-semibold">Supplier :</label>
                        <select
                          name="id_supplier"
                          value={barang.id_supplier}
                          onChange={handleChange}
                          className="form-select"
                        >
                          {supplier.map((s) => (
                            <option key={s.id} value={s.id}>
                              {s.nama}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <label className="mb-1 fw-semibold">Harga :</label>
                        <input
                          type="text"
                          name="harga"
                          value={barang.harga}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <label className="mb-1 fw-semibold">Stok :</label>
                        <input
                          type="text"
                          name="stok"
                          value={barang.stok}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <button type="submit" className="btn btn-sm btn-primary">
                        Update
                      </button>
                      <Link to="/admin/barang" className="mx-2 btn btn-sm btn-secondary">
                        Kembali
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
