import { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import API from "../services/api";

function Recipes() {
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
        setError("We could not load recipes right now. Please check your backend server.");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page-stack">
      <section className="section-heading">
        <div>
          <span className="eyebrow">Recipes</span>
          <h2>Explore recipes shared by the admin</h2>
        </div>
      </section>

      {loading ? <div className="status-card">Loading recipes...</div> : null}
      {!loading && error ? <div className="status-card status-card--error">{error}</div> : null}
      {!loading && !error && recipes.length === 0 ? (
        <div className="status-card">No recipes have been added yet.</div>
      ) : null}

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

export default Recipes;
