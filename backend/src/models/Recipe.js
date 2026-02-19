const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    ingredients: [
      {
        type: String,
        required: true,
      }
    ],

    instructions: [
      {
        type: String,
        required: true,
      }
    ],

    cookingTime: {
      type: Number,
    },

    servings: {
      type: Number,
    },

    category: {
      type: String,
      enum: ['Veg', 'Non-Veg', 'Dessert', 'Beverage'],
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Recipe', recipeSchema);
