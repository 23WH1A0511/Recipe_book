import { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import { fetchFavorites } from "../utils/favorites";
import "../App.css";

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadFavorites = async () => {
      setLoading(true);

      try {
        const favoriteRecipes = await fetchFavorites();
        setFavorites(favoriteRecipes);
        setError("");
      } catch (err) {
        console.log(err);
        setError("We could not load your favorites right now.");
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, []);

  const handleFavoriteChange = (recipeId, nextIsFavorite) => {
    if (!nextIsFavorite) {
      setFavorites((currentFavorites) =>
        currentFavorites.filter((recipe) => recipe._id !== recipeId)
      );
    }
  };

  return (
    <div className="page-stack">
      <section className="section-heading">
        <div>
          <span className="eyebrow">Favorites</span>
          <h2>Recipes you want to keep close</h2>
        </div>
      </section>

      {loading ? <div className="status-card">Loading favorites...</div> : null}
      {!loading && error ? <div className="status-card status-card--error">{error}</div> : null}
      {!loading && !error && favorites.length === 0 ? (
        <div className="status-card">You have not added any favorite recipes yet.</div>
      ) : null}

      {!loading && !error && favorites.length > 0 ? (
        <div className="recipe-grid">
          {favorites.map((recipe) => (
            <RecipeCard
              key={recipe._id}
              recipe={recipe}
              initiallyFavorite
              onFavoriteChange={handleFavoriteChange}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default Favorites;
