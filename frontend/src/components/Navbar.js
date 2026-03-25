import { NavLink, useNavigate } from "react-router-dom";
import { clearAuth, getStoredAuth } from "../utils/auth";

function Navbar() {
  const navigate = useNavigate();
  const auth = getStoredAuth();
  const isAdmin = auth?.role === "admin";

  const handleLogout = () => {
    clearAuth();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="brand-block">
        <NavLink to={isAdmin ? "/admin" : "/"} className="brand-mark">
          Recipe Book
        </NavLink>
        <p className="brand-copy">
          {isAdmin
            ? "Admin panel for recipes and user management."
            : "Explore recipes shared by the admin."}
        </p>
      </div>

      <div className="nav-links">
        {isAdmin ? (
          <>
            <NavLink to="/admin" className="nav-link">
              Dashboard
            </NavLink>
            <NavLink to="/admin/recipes/add" className="nav-link">
              Add Recipe
            </NavLink>
            <NavLink to="/admin/users" className="nav-link">
              Users
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
            <NavLink to="/recipes" className="nav-link">
              Recipes
            </NavLink>
          </>
        )}

        {!auth ? (
          <>
            <NavLink to="/login" className="nav-link">
              Login
            </NavLink>
            <NavLink to="/register" className="nav-cta">
              Register
            </NavLink>
          </>
        ) : (
          <>
            <span className="nav-user">{auth.name}</span>
            <button type="button" className="nav-logout" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
