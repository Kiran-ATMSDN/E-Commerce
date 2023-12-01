import "./Navbar.css";
const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            Pick-Basket
          </a>
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
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="/">
                  About
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="/">
                  Contact Us
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="/">
                  Feedback
                </a>
              </li>
              <li className="mx-5">
                <form className="d-flex search">
                  <input
                    className="form-control me-8a"
                    type="search"
                    placeholder="Search-Items"
                    aria-label="Search"
                  />
                  <button
                    className="btn btn-outline-info searchbtn"
                    type="submit"
                  >
                    Search
                  </button>
                </form>
              </li>
            </ul>

            <div class="dropdown">
              <span>User</span>
              <div class="dropdown-content">
                <a className="nav-link active login" href="/">
                  Login
                </a>
                <a className="nav-link active login" href="/">
                  Singup
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
