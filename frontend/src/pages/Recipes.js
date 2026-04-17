import { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import API from "../services/api";
import { getStoredAuth } from "../utils/auth";
import { fetchFavorites } from "../utils/favorites";
import "../App.css";

function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const user = getStoredAuth();

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

  useEffect(() => {
    if (user?.role !== "user") {
      return;
    }

    const loadFavorites = async () => {
      try {
        const favorites = await fetchFavorites();
        setFavoriteIds(favorites.map((recipe) => recipe._id));
      } catch (err) {
        console.log(err);
      }
    };

    loadFavorites();
  }, [user?.role]);

  const handleFavoriteChange = (recipeId, nextIsFavorite) => {
    setFavoriteIds((currentIds) =>
      nextIsFavorite
        ? Array.from(new Set([...currentIds, recipeId]))
        : currentIds.filter((currentId) => currentId !== recipeId)
    );
  };

  const filteredRecipes = recipes
    .filter((recipe) => {
    const query = searchTerm.trim().toLowerCase();
    const matchesType = selectedType === "all" || recipe.recipeType === selectedType;

    if (!matchesType) {
      return false;
    }

    if (!query) {
      return true;
    }

    return [recipe.title, recipe.ingredients, recipe.instructions, recipe.recipeType]
      .filter(Boolean)
      .some((value) => value.toLowerCase().includes(query));
    })
    .sort((a, b) => {
      const ratingDiff = (b.rating || 0) - (a.rating || 0);
      if (ratingDiff !== 0) {
        return ratingDiff;
      }
      return (a.title || "").localeCompare(b.title || "");
    });

  const selectedTypeLabel =
    selectedType === "all"
      ? "All"
      : selectedType === "non-veg"
        ? "Non-Veg"
        : selectedType === "bakery"
          ? "Bakery"
          : "Veg";

  return (
    <div className="page-stack">
      <section className="section-heading">
        <div>
          <span className="eyebrow">Recipes</span>
          <h2>Explore recipes shared by the admin</h2>
        </div>
      </section>

      <section className="search-panel">
        <label className="field search-field">
          <span>Search recipes</span>
          <input
            type="text"
            placeholder="Search by recipe name or ingredients"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </label>
        <div className="filter-chips">
          {[
            { value: "all", label: "All" },
            { value: "veg", label: "Veg" },
            { value: "non-veg", label: "Non-Veg" },
            { value: "bakery", label: "Bakery" },
          ].map((type) => (
            <button
              key={type.label}
              type="button"
              className={`filter-chip${selectedType === type.value ? " active" : ""}`}
              onClick={() => setSelectedType(type.value)}
            >
              {type.label}
            </button>
          ))}
        </div>
        <p className="search-summary">
          {searchTerm.trim()
            ? `${filteredRecipes.length} recipe(s) found for "${searchTerm}".`
            : `${recipes.length} recipe(s) available.`}
        </p>
      </section>

      {loading ? <div className="status-card">Loading recipes...</div> : null}
      {!loading && error ? <div className="status-card status-card--error">{error}</div> : null}
      {!loading && !error && recipes.length === 0 ? (
        <div className="status-card">No recipes have been added yet.</div>
      ) : null}
      {!loading && !error && recipes.length > 0 && filteredRecipes.length === 0 ? (
        <div className="status-card">
          {searchTerm.trim()
            ? `No ${selectedTypeLabel.toLowerCase()} recipes matched "${searchTerm}".`
            : `No recipes found in the ${selectedTypeLabel} filter. Try All or another category.`}
        </div>
      ) : null}

      {!loading && !error && filteredRecipes.length > 0 ? (
        <div className="recipe-grid">
          {filteredRecipes.map((recipe) => (
            <RecipeCard
              key={recipe._id}
              recipe={recipe}
              initiallyFavorite={favoriteIds.includes(recipe._id)}
              onFavoriteChange={handleFavoriteChange}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default Recipes;
