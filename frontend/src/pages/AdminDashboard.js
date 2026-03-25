import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";
import API from "../services/api";

function AdminDashboard() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);

    API.get("/recipes")
      .then((res) => {
        setRecipes(Array.isArray(res.data) ? res.data : []);
        setError("");
      })
      .catch((err) => {
        console.log(err);
        setError("Could not load admin recipe data.");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page-stack">
      <section className="hero-panel">
        <div>
          <span className="eyebrow">Admin Dashboard</span>
          <h1>Manage recipes and users from one place.</h1>
          <p>
            Add new recipes for users, update existing recipes, and open the user management page
            to monitor registered accounts.
          </p>
          <div className="hero-actions">
            <Link to="/admin/recipes/add" className="primary-button">
              Add Recipe
            </Link>
            <Link to="/admin/users" className="secondary-button">
              Manage Users
            </Link>
          </div>
        </div>

        <div className="hero-stats">
          <div className="stat-card">
            <strong>{recipes.length}</strong>
            <span>Total Recipes</span>
          </div>
          <div className="stat-card">
            <strong>Admin</strong>
            <span>Recipe and account management</span>
          </div>
          <div className="stat-card">
            <strong>Users</strong>
            <span>Can only access recipes after registration/login</span>
          </div>
        </div>
      </section>

      <section className="section-heading">
        <div>
          <span className="eyebrow">Recipe Management</span>
          <h2>Current recipes</h2>
        </div>
      </section>

      {loading ? <div className="status-card">Loading recipes...</div> : null}
      {!loading && error ? <div className="status-card status-card--error">{error}</div> : null}
      {!loading && !error && recipes.length > 0 ? (
        <div className="recipe-grid">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default AdminDashboard;
