import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../App.css";

const AddRecipe = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [recipeType, setRecipeType] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!recipeType) {
      setError("Please select a recipe type.");
      return;
    }

    try {
      await API.post("/recipes", {
        title,
        imageUrl,
        recipeType,
        ingredients,
        instructions: steps,
        createdBy: "admin",
      });

      navigate("/recipes");
    } catch (err) {
      setError(err.response?.data?.message || "Error adding recipe.");
    }
  };

  return (
    <section className="page-stack page-shell">
      <div className="section-heading">
        <div>
          <span className="eyebrow">Admin</span>
          <h2>Add a new recipe</h2>
        </div>
      </div>

      <form className="form-card recipe-form" onSubmit={handleSubmit}>
        <label className="field">
          <span>Title</span>
          <input
            placeholder="Recipe title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        <label className="field">
          <span>Image URL</span>
          <input
            placeholder="Paste recipe image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </label>

        <label className="field">
          <span>Recipe Type</span>
          <select value={recipeType} onChange={(e) => setRecipeType(e.target.value)}>
            <option value="">Select type</option>
            <option value="veg">Veg</option>
            <option value="non-veg">Non-Veg</option>
            <option value="bakery">Bakery</option>
          </select>
        </label>

        <label className="field">
          <span>Ingredients</span>
          <textarea
            placeholder="List ingredients"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          />
        </label>

        <label className="field">
          <span>Steps</span>
          <textarea
            placeholder="Write cooking steps"
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
          />
        </label>

        {error ? <div className="status-card status-card--error">{error}</div> : null}

        <button className="button button-primary" type="submit">
          Add Recipe
        </button>
      </form>
    </section>
  );
};

export default AddRecipe;
