const User = require("../models/User");

const sanitizeUser = (user) => {
  if (!user) {
    return null;
  }

  const userObject = user.toObject ? user.toObject() : user;
  const { password, ...safeUser } = userObject;
  return safeUser;
};

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required." });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });

    if (existingUser) {
      return res.status(409).json({ message: "An account with this email already exists." });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: role === "admin" ? "admin" : "user",
      favorites: [],
    });

    res.status(201).json({
      message: "Account created successfully.",
      user: sanitizeUser(user),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email?.toLowerCase(), password });

    if (user) {
      res.json({ message: "Login Successful", user: sanitizeUser(user) });
    } else {
      res.status(401).json({ message: "Invalid Email or Password" });
    }

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getFavoriteRecipes = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select("-password")
      .populate("favorites");

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.json({
      favorites: user.favorites || [],
      user: sanitizeUser(user),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.toggleFavoriteRecipe = async (req, res) => {
  try {
    const { id, recipeId } = req.params;
    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const favoriteIds = (user.favorites || []).map((favorite) => favorite.toString());
    const isFavorite = favoriteIds.includes(recipeId);

    user.favorites = isFavorite
      ? favoriteIds.filter((favoriteId) => favoriteId !== recipeId)
      : [...favoriteIds, recipeId];

    await user.save();
    await user.populate("favorites");

    res.json({
      favorites: user.favorites || [],
      isFavorite: !isFavorite,
      user: sanitizeUser(user),
      message: !isFavorite
        ? "Recipe added to favorites."
        : "Recipe removed from favorites.",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
