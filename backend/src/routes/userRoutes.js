const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getUsers,
  getFavoriteRecipes,
  toggleFavoriteRecipe
} = require("../controllers/userController");

router.get("/", getUsers);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/:id/favorites", getFavoriteRecipes);
router.patch("/:id/favorites/:recipeId", toggleFavoriteRecipe);

module.exports = router;
