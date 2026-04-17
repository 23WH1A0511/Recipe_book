const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  ingredients: {
    type: String,
    required: true
  },

  instructions: {
    type: String,
    required: true
  },

  imageUrl: {
    type: String,
    default: ""
  },

  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },

  ratingCount: {
    type: Number,
    min: 0,
    default: 0
  },

  recipeType: {
    type: String,
    enum: ["veg", "non-veg", "bakery", ""],
    default: ""
  },

  createdBy: {
    type: String
  }
});

module.exports = mongoose.model("Recipe", recipeSchema);
