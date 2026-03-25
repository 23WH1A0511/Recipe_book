const Recipe = require("../models/Recipe");

exports.getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.addRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.create(req.body);
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(recipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteRecipe = async (req, res) => {
  try {
    await Recipe.findByIdAndDelete(req.params.id);
    res.json({ message: "Recipe Deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};