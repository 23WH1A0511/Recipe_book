import { Link } from "react-router-dom";
import { getStoredAuth } from "../utils/auth";

function RecipeCard({ recipe }) {
  const auth = getStoredAuth();
  const isAdmin = auth?.role === "admin";
  const description =
    recipe.description?.trim() || "A delicious recipe waiting for your kitchen touch.";

  return (
    <article className="recipe-card">
      <div className="recipe-card__content">
        <span className="recipe-card__badge">Recipe</span>
        <h3>{recipe.title}</h3>
        <p>{description}</p>
      </div>

      <div className="recipe-card__footer">
        <Link to={`/recipes/${recipe._id}`} className="secondary-button">
          View Details
        </Link>
        {isAdmin ? (
          <Link to={`/admin/recipes/${recipe._id}/edit`} className="text-link">
            Edit
          </Link>
        ) : null}
      </div>
    </article>
  );
}

export default RecipeCard;
