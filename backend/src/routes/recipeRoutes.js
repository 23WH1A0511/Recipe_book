const express = require("express");
const router = express.Router();

const {
  getRecipes,
  addRecipe,
  updateRecipe,
  rateRecipe,
  deleteRecipe
} = require("../controllers/recipeController");

router.get("/", getRecipes);
router.post("/", addRecipe);
router.put("/:id", updateRecipe);
router.post("/:id/rate", rateRecipe);
router.delete("/:id", deleteRecipe);

module.exports = router;
