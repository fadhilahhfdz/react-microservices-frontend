import { Link } from "react-router-dom";
import AppRoutes from "./routes/index";

function App() {
  return (
    // <Routes>
    //   <Route path="/login" element={<Login />} />
    //   <Route path="/register" element={<Register />} />
    // </Routes>

    <div>
      <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
        <div className="container">
          <Link to="/" className="navbar-brand">
            Home
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a
                  href="#"
                  // target="_blank"
                  className="nav-link active"
                  aria-current="page"
                >
                  Manajemen Barang
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mt-5">
        <AppRoutes />
      </div>
    </div>
  );
}

export default App;
