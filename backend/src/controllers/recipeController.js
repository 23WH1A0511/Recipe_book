const Recipe = require("../models/Recipe");

const inferRecipeType = (recipeLike = {}) => {
  const combinedText = [
    recipeLike.title,
    recipeLike.ingredients,
    recipeLike.instructions,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  const nonVegKeywords = [
    "chicken",
    "mutton",
    "fish",
    "egg",
    "beef",
    "prawn",
    "meat",
  ];

  const bakeryKeywords = [
    "cake",
    "bread",
    "bun",
    "cookie",
    "biscuit",
    "pastry",
    "bakery",
  ];

  const vegKeywords = [
    "paneer",
    "panner",
    "mushroom",
    "vegetable",
    "veg",
    "potato",
    "tomato",
    "carrot",
    "cabbage",
    "cauliflower",
    "broccoli",
    "spinach",
    "peas",
    "beans",
    "corn",
    "gobi",
    "aloo",
    "palak",
  ];

  if (nonVegKeywords.some((keyword) => combinedText.includes(keyword))) {
    return "non-veg";
  }

  if (bakeryKeywords.some((keyword) => combinedText.includes(keyword))) {
    return "bakery";
  }

  if (vegKeywords.some((keyword) => combinedText.includes(keyword))) {
    return "veg";
  }

  return recipeLike.recipeType || "";
};

exports.getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    const normalizedRecipes = recipes.map((recipe) => ({
      ...recipe.toObject(),
      recipeType: inferRecipeType(recipe),
    }));

    res.json(normalizedRecipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.addRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.create({
      ...req.body,
      recipeType: inferRecipeType(req.body),
    });
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        recipeType: inferRecipeType(req.body),
      },
      { new: true }
    );

    res.json(recipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.rateRecipe = async (req, res) => {
  try {
    const submittedRating = Number(req.body.rating);

    if (!Number.isFinite(submittedRating) || submittedRating < 1 || submittedRating > 5) {
      return res.status(400).json({ message: "Rating must be between 1 and 5." });
    }

    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found." });
    }

    const currentCount = recipe.ratingCount || 0;
    const currentAverage = recipe.rating || 0;
    const nextCount = currentCount + 1;
    const nextAverage =
      (currentAverage * currentCount + submittedRating) / nextCount;

    recipe.rating = Number(nextAverage.toFixed(1));
    recipe.ratingCount = nextCount;

    await recipe.save();
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
