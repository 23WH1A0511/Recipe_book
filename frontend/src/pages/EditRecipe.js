import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";
import "../App.css";

const EditRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [recipeType, setRecipeType] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecipe = async () => {
      const res = await API.get("/recipes");
      const recipe = res.data.find((item) => item._id === id);

      if (recipe) {
        setTitle(recipe.title);
        setImageUrl(recipe.imageUrl || "");
        setRecipeType(recipe.recipeType || "");
        setIngredients(recipe.ingredients);
        setSteps(recipe.instructions);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");

    if (!recipeType) {
      setError("Please select a recipe type.");
      return;
    }

    try {
      await API.put(`/recipes/${id}`, {
        title,
        imageUrl,
        recipeType,
        ingredients,
        instructions: steps,
      });

      navigate("/recipes");
    } catch (err) {
      setError(err.response?.data?.message || "Error updating recipe.");
    }
  };

  return (
    <section className="page-stack page-shell">
      <div className="section-heading">
        <div>
          <span className="eyebrow">Admin</span>
          <h2>Edit recipe</h2>
        </div>
      </div>

      <form className="form-card recipe-form" onSubmit={handleUpdate}>
        <label className="field">
          <span>Title</span>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>

        <label className="field">
          <span>Image URL</span>
          <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
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
          <textarea value={ingredients} onChange={(e) => setIngredients(e.target.value)} />
        </label>

        <label className="field">
          <span>Steps</span>
          <textarea value={steps} onChange={(e) => setSteps(e.target.value)} />
        </label>

        {error ? <div className="status-card status-card--error">{error}</div> : null}

        <button className="button button-primary" type="submit">
          Update Recipe
        </button>
      </form>
    </section>
  );
};

export default EditRecipe;
