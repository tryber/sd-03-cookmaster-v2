const { errMessage, RECIPE_NO_FOUND } = require('../middlewares/errosMessage');
const recipesModel = require('../models/recipesModel');
const recipeModel = require('../models/recipesModel');
const util = require('util');
const userModel = require('../models/userModel');

const checkingAdministrator = async (userId, recipeId) => {
  const user = await userModel.finUserById(userId);
  const recipe = await recipeModel.findRecipeById(recipeId);

  if (!user) return false;
  if (user.role === 'user' && !util.isDeepStrictEqual(recipe.userId, userId)) return false;
  return true;
};

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

const updateRecipe = async (id, userId, newRecipe) => {
  const { name, ingredients, preparation } = newRecipe;

  if (!(await checkingAdministrator(userId, id))) {
    const err = errMessage('Não autorizado');
    return err;
  }
  await recipeModel.updateRecipe(id, name, ingredients, preparation);
  return { _id: id, name, ingredients, preparation, userId };
};

const deleteRecipe = async (id, userId) => {
  if (!(await checkingAdministrator(userId, id))) {
    const resultErr = errMessage('Não autorizado');
    return resultErr;
  }
  await recipeModel.deleteRecipe(id);
  return true;
};

const updateRecipeImage = async (id, user) => {
  const { _id, name, ingredients, preparation, userId } = await recipeModel.findRecipeById(id);
  if (!await checkingAdministrator(user, id)) {
    return errMessage('Não autorizado') ;
  }
  const recipePath = await recipeModel.updateRecipeImage(id, 'localhost:3000/images/');
  return { _id, name, ingredients, preparation, userId, image: recipePath };
};

module.exports = {
  createRecipe,
  findAllRecipes,
  findRecipeById,
  updateRecipe,
  deleteRecipe,
  updateRecipeImage,
};
