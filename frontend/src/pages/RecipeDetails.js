import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import API from "../services/api";

function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);

    API.get(`/recipes/${id}`)
      .then((res) => {
        setRecipe(res.data);
        setError("");
      })
      .catch((err) => {
        console.log(err);
        setError("Could not load this recipe.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="status-card">Loading recipe details...</div>;
  }

  if (error) {
    return <div className="status-card status-card--error">{error}</div>;
  }

  if (!recipe) {
    return <div className="status-card">Recipe not found.</div>;
  }

  return (
    <section className="details-card">
      <span className="eyebrow">Recipe Details</span>
      <h1>{recipe.title}</h1>
      <p className="details-copy">{recipe.description}</p>

      <div className="details-actions">
        <Link to={`/recipes/${id}/edit`} className="primary-button">
          Edit Recipe
        </Link>
        <Link to="/" className="secondary-button">
          Back Home
        </Link>
      </div>
    </section>
  );
}

export default RecipeDetails;
