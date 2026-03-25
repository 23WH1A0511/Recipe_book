import { Link, Navigate } from "react-router-dom";
import { getStoredAuth } from "../utils/auth";

function Home() {
  const auth = getStoredAuth();

  if (auth?.role === "admin") {
    return <Navigate to="/admin" replace />;
  }

  return (
    <div className="page-stack">
      <section className="hero-panel">
        <div>
          <span className="eyebrow">User Interface</span>
          <h1>Welcome to your recipe space.</h1>
          <p>
            Users can create an account, log in, and browse recipes added by the admin.
            Keep the experience simple with a clear home page and a dedicated recipes page.
          </p>
          <div className="hero-actions">
            <Link to="/recipes" className="primary-button">
              Browse Recipes
            </Link>
            {!auth ? (
              <Link to="/register" className="secondary-button">
                Create Account
              </Link>
            ) : null}
          </div>
        </div>

        <div className="hero-stats">
          <div className="stat-card">
            <strong>Users</strong>
            <span>Create an account before logging in</span>
          </div>
          <div className="stat-card">
            <strong>Recipes</strong>
            <span>View all recipes added by the admin</span>
          </div>
          <div className="stat-card">
            <strong>Admin</strong>
            <span>Manage recipes and user accounts</span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
