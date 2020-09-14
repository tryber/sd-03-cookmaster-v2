const recipeModel = require('../models/recipeModel');

const addRecipe = async ({ name, ingredients, preparation, userId }) => {
  if (!name || !ingredients || !preparation) {
    return ({ error: true, message: 'Invalid entries. Try again.' });
  }

  const recipe = await recipeModel.add({ name, ingredients, preparation, userId });
  return recipe;
};

const getAllRecipes = async () => {
  const recipes = await recipeModel.getAll();
  return recipes;
};

const getRecipeById = async (id) => {
  try {
    const recipe = await recipeModel.getRecipeById(id);

    if (!recipe) {
      return ({ error: true, message: 'recipe not found' });
    }

    return recipe;
  } catch (err) {
    return ({ error: true, message: 'recipe not found' });
  }
};

const editRecipe = async ({ id, name, ingredients, preparation }) => {
  const recipe = await getRecipeById(id);

  if (recipe.error) {
    return recipe;
  }

  const result = await recipeModel.update(id, name, ingredients, preparation);
  return result;
};

module.exports = {
  addRecipe,
  getAllRecipes,
  getRecipeById,
  editRecipe,
};
