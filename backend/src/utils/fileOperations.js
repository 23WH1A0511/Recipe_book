const fs = require('fs/promises');
const path = require('path');

const recipeFilePath = path.join(__dirname, '..', '..', 'data', 'recipes.json');
const sampleRecipes = [
  {
    title: 'Paneer Butter Masala',
    ingredients: 'Paneer, butter, tomato, onion, spices',
    instructions: 'Cook onion and tomato, add spices, then simmer paneer in the gravy.',
    recipeType: 'veg',
    createdBy: 'admin@gmail.com',
  },
  {
    title: 'Chicken Biryani',
    ingredients: 'Chicken, rice, curd, mint, masala',
    instructions: 'Marinate chicken, layer with rice, and cook on dum.',
    recipeType: 'non-veg',
    createdBy: 'admin@gmail.com',
  },
  {
    title: 'Chocolate Cake',
    ingredients: 'Flour, cocoa powder, sugar, butter, eggs',
    instructions: 'Prepare batter, pour into a tin, and bake until done.',
    recipeType: 'bakery',
    createdBy: 'admin@gmail.com',
  },
];

async function ensureRecipeFile() {
  const directory = path.dirname(recipeFilePath);
  await fs.mkdir(directory, { recursive: true });

  try {
    await fs.access(recipeFilePath);
  } catch (error) {
    await fs.writeFile(recipeFilePath, JSON.stringify([], null, 2), 'utf8');
  }
}

async function readRecipesFromFile() {
  await ensureRecipeFile();
  const fileContent = await fs.readFile(recipeFilePath, 'utf8');
  return JSON.parse(fileContent);
}

async function writeRecipesToFile(recipes) {
  await ensureRecipeFile();
  await fs.writeFile(recipeFilePath, JSON.stringify(recipes, null, 2), 'utf8');
  return recipes;
}

async function appendRecipeToFile(recipe) {
  const recipes = await readRecipesFromFile();
  recipes.push(recipe);
  await writeRecipesToFile(recipes);
  return recipe;
}

module.exports = {
  recipeFilePath,
  readRecipesFromFile,
  writeRecipesToFile,
  appendRecipeToFile,
};

async function runRecipeFileOperationsDemo() {
  const existingRecipes = await readRecipesFromFile();

  if (existingRecipes.length === 0) {
    await writeRecipesToFile(sampleRecipes);
    console.log('Recipe data written to file successfully.');
  } else {
    console.log('Recipe data file already exists. Reading available recipes.');
  }

  const recipes = await readRecipesFromFile();
  console.log('Recipe data read from file:');
  console.log(recipes);

  const vegRecipes = recipes.filter((recipe) => recipe.recipeType === 'veg');
  console.log('\nVeg recipes:');
  console.log(vegRecipes);

  console.log(`\nTotal recipes: ${recipes.length}`);
}

if (require.main === module) {
  runRecipeFileOperationsDemo().catch((error) => {
    console.error('Error performing recipe file operations:', error.message);
  });
}
