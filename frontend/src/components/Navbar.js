import { Link, NavLink, useNavigate } from "react-router-dom";
import { clearAuth, getStoredAuth } from "../utils/auth";
import "../App.css";

const Navbar = () => {
  const auth = getStoredAuth();
  const user = auth?.user;
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuth();
    navigate("/login", { replace: true });
  };

  return (
    <header className="navbar">
      <Link to="/" className="brand">
        <span className="brand-mark">RB</span>
        <div>
          <p className="brand-title">Recipe Book</p>
          <span className="brand-subtitle">Simple cooking, organized well</span>
        </div>
      </Link>

      <nav className="nav-links">
        <NavLink to="/" className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}>
          Home
        </NavLink>
        <NavLink
          to="/recipes"
          className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
        >
          Recipes
        </NavLink>
        {auth?.role === "user" ? (
          <NavLink
            to="/favorites"
            className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
          >
            Favorites
          </NavLink>
        ) : null}
        {auth?.role === "admin" ? (
          <NavLink
            to="/add"
            className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
          >
            Add Recipe
          </NavLink>
        ) : null}
      </nav>

      <div className="nav-actions">
        {user ? (
          <>
            <div className="user-chip">
              <span>{user.name}</span>
              <small>{user.role}</small>
            </div>
            <button className="button button-secondary" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink
              to="/login"
              className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
            >
              Login
            </NavLink>
            <Link to="/register" className="button button-primary nav-cta">
              Register
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
