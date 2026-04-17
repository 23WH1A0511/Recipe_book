import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";
import API from "../services/api";
import { getStoredAuth } from "../utils/auth";
import { fetchFavorites } from "../utils/favorites";
import "../App.css";

const heroRecipe =
  "https://media.gettyimages.com/id/1125612329/photo/cookbook-with-vegetables-spices-and-herbs-shot-from-above-on-rustic-wooden-table.jpg?s=612x612&w=gi&k=20&c=_Tciubz9jSuQxdm1OlmhjmtJnY0VuagA7nv_T5mrH38=";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const user = getStoredAuth();

  useEffect(() => {
    fetchRecipes();
  }, []);

  useEffect(() => {
    if (user?.role !== "user") {
      return;
    }

    const loadFavorites = async () => {
      try {
        const favorites = await fetchFavorites();
        setFavoriteIds(favorites.map((recipe) => recipe._id));
      } catch (error) {
        console.log(error);
      }
    };

    loadFavorites();
  }, [user?.role]);

  const fetchRecipes = async () => {
    const res = await API.get("/recipes");
    setRecipes(res.data);
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/recipes/${id}`);
      fetchRecipes();
    } catch (err) {
      console.log(err);
    }
  };

  const handleFavoriteChange = (recipeId, nextIsFavorite) => {
    setFavoriteIds((currentIds) =>
      nextIsFavorite
        ? Array.from(new Set([...currentIds, recipeId]))
        : currentIds.filter((currentId) => currentId !== recipeId)
    );
  };

  return (
    <main className="page-stack">
      <section className="hero-section">
        <div className="hero-copy hero-copy-visual">
          <div className="hero-visual-badge">Recipe Book</div>
          <img src={heroRecipe} alt="Recipe collection hero visual" className="hero-visual-image" />
          <div className="hero-actions hero-actions-centered hero-actions-inside">
            <Link to="/recipes" className="button button-primary">
              Browse Recipes
            </Link>
          </div>
        </div>
      </section>

      <section className="section-heading">
        <div>
          <span className="eyebrow">Featured collection</span>
          <h2>Start with the latest recipes</h2>
        </div>
        <Link to="/recipes" className="button button-secondary">
          See All
        </Link>
      </section>

      <div className="recipe-grid">
        {recipes.slice(0, 6).map((recipe) => (
          <div key={recipe._id} className="recipe-grid-item">
            <RecipeCard
              recipe={recipe}
              initiallyFavorite={favoriteIds.includes(recipe._id)}
              onFavoriteChange={handleFavoriteChange}
            />
            {user?.role === "admin" ? (
              <button
                className="button button-danger button-block"
                onClick={() => handleDelete(recipe._id)}
              >
                Delete Recipe
              </button>
            ) : null}
          </div>
        ))}
      </div>
    </main>
  );
};

export default Home;
