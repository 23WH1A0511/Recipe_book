import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getStoredAuth } from "../utils/auth";
import { toggleFavorite } from "../utils/favorites";

const imagePositions = [
  "center 18%",
  "center 35%",
  "center 52%",
  "center 70%",
  "left 40%",
  "right 45%",
];

const getCardVariant = (recipe) => {
  const source = `${recipe.title || ""}${recipe._id || ""}`;
  return source.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0) % imagePositions.length;
};

const getSubtitle = (recipe) => {
  const firstIngredient = (recipe.ingredients || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)[0];

  return firstIngredient ? `${firstIngredient} recipe` : "Fresh recipe";
};

const getTypeLabel = (recipeType) => {
  if (!recipeType) {
    return "";
  }

  if (recipeType === "non-veg") {
    return "Non-Veg";
  }

  if (recipeType === "bakery") {
    return "Bakery";
  }

  return "Veg";
};

const getStars = (rating) => {
  const rounded = Math.max(0, Math.min(5, Math.round(rating || 0)));
  return rounded > 0 ? "★".repeat(rounded) : "No ratings";
};

const RecipeCard = ({ recipe, initiallyFavorite = false, onFavoriteChange }) => {
  const navigate = useNavigate();
  const auth = getStoredAuth();
  const isAdmin = auth?.role === "admin";
  const isUser = auth?.role === "user";
  const variant = getCardVariant(recipe);
  const [isFavorite, setIsFavorite] = useState(initiallyFavorite);
  const [favoriteLoading, setFavoriteLoading] = useState(false);

  useEffect(() => {
    setIsFavorite(initiallyFavorite);
  }, [initiallyFavorite]);

  const handleFavoriteToggle = async () => {
    setFavoriteLoading(true);

    try {
      const result = await toggleFavorite(recipe._id);
      setIsFavorite(result.isFavorite);
      onFavoriteChange?.(recipe._id, result.isFavorite);
    } catch (error) {
      console.log(error);
    } finally {
      setFavoriteLoading(false);
    }
  };

  return (
    <article className="recipe-card recipe-card-gallery">
      <div className="recipe-card-media">
        {isUser ? (
          <button
            type="button"
            className={`favorite-chip${isFavorite ? " active" : ""}`}
            onClick={handleFavoriteToggle}
            disabled={favoriteLoading}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            {isFavorite ? "♥ Favorite" : "♡ Favorite"}
          </button>
        ) : null}
        {recipe.imageUrl ? (
          <img
            src={recipe.imageUrl}
            alt={recipe.title}
            className="recipe-card-image"
            style={{ objectPosition: imagePositions[variant] }}
          />
        ) : (
          <div className="recipe-card-image recipe-card-image-placeholder">
            <span>{recipe.title}</span>
          </div>
        )}
      </div>

      <div className="recipe-card-header">
        <div className="recipe-card-meta">
          {recipe.recipeType ? (
            <span className={`recipe-type-badge recipe-type-badge--${recipe.recipeType}`}>
              {getTypeLabel(recipe.recipeType)}
            </span>
          ) : null}
          <span className="recipe-rating">
            {getStars(recipe.rating)} {recipe.ratingCount ? `(${recipe.ratingCount})` : ""}
          </span>
        </div>
        <h3>{recipe.title}</h3>
        <p className="recipe-card-subtitle">{getSubtitle(recipe)}</p>
      </div>

      <div className="recipe-card-footer">
        <button
          className="button button-primary recipe-card-button"
          onClick={() => navigate(`/recipe/${recipe._id}`)}
        >
          View Details
        </button>

        {isAdmin ? (
          <button
            className="button button-secondary recipe-card-button"
            onClick={() => navigate(`/edit/${recipe._id}`)}
          >
            Edit
          </button>
        ) : null}
      </div>
    </article>
  );
};

export default RecipeCard;
