import { NavLink } from "react-router-dom";

function Navigation({ isAuth }) {
  return (
    <ul className="navbar-nav gap-4">
      {isAuth ? (
        <>
          <li className="nav-item">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "nav-link active fw-semibold px-3 rounded-pill bg-dark text-white"
                  : "nav-link text-dark fw-semibold"
              }
            >
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/catalog"
              className={({ isActive }) =>
                isActive
                  ? "nav-link active fw-semibold px-3 rounded-pill bg-dark text-white"
                  : "nav-link text-dark fw-semibold"
              }
            >
              Catalog
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive
                  ? "nav-link active fw-semibold px-3 rounded-pill bg-dark text-white"
                  : "nav-link text-dark fw-semibold"
              }
            >
              Cart
            </NavLink>
          </li>
        </>
      ) : (
        <>
          <li className="nav-item">
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive
                  ? "nav-link active fw-semibold px-3 rounded-pill bg-dark text-white"
                  : "nav-link text-dark fw-semibold"
              }
            >
              Login
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/register"
              className={({ isActive }) =>
                isActive
                  ? "nav-link active fw-semibold px-3 rounded-pill bg-dark text-white"
                  : "nav-link text-dark fw-semibold"
              }
            >
              Register
            </NavLink>
          </li>
        </>
      )}
    </ul>
  );
}

export default Navigation;
