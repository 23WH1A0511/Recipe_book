import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import { getStoredAuth } from "../utils/auth";
import { fetchFavorites, toggleFavorite } from "../utils/favorites";
import "../App.css";

const RecipeDetails = () => {
  const { id } = useParams();
  const auth = getStoredAuth();
  const isAdmin = auth?.role === "admin";
  const isUser = auth?.role === "user";
  const [recipe, setRecipe] = useState(null);
  const [selectedRating, setSelectedRating] = useState("5");
  const [ratingMessage, setRatingMessage] = useState("");
  const [ratingLoading, setRatingLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const [favoriteMessage, setFavoriteMessage] = useState("");

  useEffect(() => {
    const fetchRecipe = async () => {
      const res = await API.get("/recipes");
      const found = res.data.find((item) => item._id === id);
      setRecipe(found);
    };

    fetchRecipe();
  }, [id]);

  useEffect(() => {
    if (!isUser) {
      return;
    }

    const loadFavorites = async () => {
      try {
        const favorites = await fetchFavorites();
        setIsFavorite(favorites.some((favorite) => favorite._id === id));
      } catch (error) {
        console.log(error);
      }
    };

    loadFavorites();
  }, [id, isUser]);

  const handleRateRecipe = async (e) => {
    e.preventDefault();
    setRatingLoading(true);
    setRatingMessage("");

    try {
      const res = await API.post(`/recipes/${id}/rate`, {
        rating: Number(selectedRating),
      });

      setRecipe(res.data);
      setRatingMessage("Thanks for rating this recipe.");
    } catch (error) {
      setRatingMessage(error.response?.data?.message || "Could not submit your rating.");
    } finally {
      setRatingLoading(false);
    }
  };

  const handleFavoriteToggle = async () => {
    setFavoriteLoading(true);
    setFavoriteMessage("");

    try {
      const result = await toggleFavorite(id);
      setIsFavorite(result.isFavorite);
      setFavoriteMessage(result.message);
    } catch (error) {
      setFavoriteMessage(error.response?.data?.message || error.message || "Could not update favorites.");
    } finally {
      setFavoriteLoading(false);
    }
  };

  if (!recipe) {
    return <div className="page-stack"><div className="status-card">Loading recipe...</div></div>;
  }

  return (
    <div className="page-stack page-shell">
      <div className="detail-card">
        <span className="eyebrow">Recipe details</span>
        <h2>{recipe.title}</h2>

        <div className="detail-meta">
          {recipe.recipeType ? (
            <span className={`recipe-type-badge recipe-type-badge--${recipe.recipeType}`}>
              {recipe.recipeType}
            </span>
          ) : null}
          <span className="detail-rating">
            Rating: {recipe.rating ? `${recipe.rating}/5` : "No ratings yet"}
            {recipe.ratingCount ? ` (${recipe.ratingCount} votes)` : ""}
          </span>
        </div>

        {isUser ? (
          <div className="favorite-panel">
            <button
              type="button"
              className={`button ${isFavorite ? "button-secondary" : "button-primary"}`}
              onClick={handleFavoriteToggle}
              disabled={favoriteLoading}
            >
              {favoriteLoading
                ? "Updating..."
                : isFavorite
                  ? "Remove from Favorites"
                  : "Save to Favorites"}
            </button>
            {favoriteMessage ? <p className="favorite-message">{favoriteMessage}</p> : null}
          </div>
        ) : null}

        <div className="detail-section">
          <h3>Ingredients</h3>
          <p>{recipe.ingredients}</p>
        </div>

        <div className="detail-section">
          <h3>Steps</h3>
          <p>{recipe.instructions || recipe.steps}</p>
        </div>

        {!isAdmin ? (
          <form className="rating-panel" onSubmit={handleRateRecipe}>
            <div>
              <h3>Rate this recipe</h3>
            </div>

            <div className="rating-actions">
              <select value={selectedRating} onChange={(e) => setSelectedRating(e.target.value)}>
                <option value="5">5 - Excellent</option>
                <option value="4">4 - Good</option>
                <option value="3">3 - Average</option>
                <option value="2">2 - Poor</option>
                <option value="1">1 - Failed</option>
              </select>
              <button className="button button-primary" type="submit" disabled={ratingLoading}>
                {ratingLoading ? "Submitting..." : "Submit Rating"}
              </button>
            </div>

            {ratingMessage ? <p className="rating-message">{ratingMessage}</p> : null}
          </form>
        ) : null}
      </div>
    </div>
  );
};

export default RecipeDetails;
