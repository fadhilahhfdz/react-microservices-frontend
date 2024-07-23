import { useState } from "react";
import Api from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  // const [validation, setValidation] = useState([]);

  const register = async (e) => {
    e.preventDefault();

    await Api.post("/api/register", {
      nama: nama,
      email: email,
      password: password,
      role: role,
    })
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        // setValidation(error.response.data);
        console.error('Gagal register', error)
      });
  };

  return (
    <div className="row justify-content-center">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card border-0 rounded shadow-sm">
            <div className="card-body">
              <h4>Register</h4>
              <hr />
              {/* {validation.errors && (
                <div className="alert alert-danger mt-2 pb-0">
                  {validation.errors.map((error, index) => (
                    <p key={index}>
                      {error.path} : {error.msg}
                    </p>
                  ))}
                </div>
              )} */}
              <form onSubmit={register}>
                <div className="row">
                  <div className="col-md-12 mb-3">
                    <div className="form-group">
                      <label className="mb-1 fw-bold">Nama</label>
                      <input
                        type="text"
                        value={nama}
                        onChange={(e) => setNama(e.target.value)}
                        className="form-control"
                        placeholder="Nama"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <div className="form-group">
                      <label className="mb-1 fw-bold">Email</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-control"
                        placeholder="Alamat Email"
                      />
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="form-group">
                      <label className="mb-1 fw-bold">Password</label>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-control"
                        placeholder="Password"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="form-group">
                    <label className="mb-1 fw-bold">Role</label>
                    <input
                      type="text"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="form-control"
                      placeholder="Role"
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
