const { errMessage, RECIPE_NO_FOUND } = require('../middlewares/errosMessage');
const recipesModel = require('../models/recipesModel');
const recipeModel = require('../models/recipesModel');

const createRecipe = async (name, ingredients, preparation, userId) => {
  const recipe = await recipeModel.createRecipe(name, ingredients, preparation, userId);

  return { recipe: { name, ingredients, preparation, userId } };
};

const findAllRecipes = async () => await recipesModel.findAllRecipes();

const findRecipeById = async (id) => {
  const verifyRecipeById = await recipeModel.findRecipeById(id);
  if (!verifyRecipeById) return errMessage(RECIPE_NO_FOUND);
  return verifyRecipeById;
};
module.exports = { createRecipe, findAllRecipes, findRecipeById };
