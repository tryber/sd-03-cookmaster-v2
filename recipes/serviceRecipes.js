const util = require('util');
const model = require('./modelRecipes');
const modelUser = require('../users/modelUsers');
const { validateId } = require('../validation/validation');

async function createRecipes(name, ingredients, preparation, userId) {
  return model.createRecipes(name, ingredients, preparation, userId);
}

async function getRecipes() {
  return model.getRecipes();
}

async function getRecipesById(id) {
  const validate = validateId(id);
  const findRecipeById = await model.getRecipesById(id);

  if (validate) return { message: 'recipe not found' };
  if (!findRecipeById) return { message: 'recipe not found' };

  return findRecipeById;
}

const verifyAdmin = async (id, recipeId) => {
  const user = await modelUser.getUserById(id);
  const recipe = await model.getRecipesById(recipeId);

  if (!user) return false;
  if (user.role === 'admin' && util.isDeepStrictEqual(recipe.userId, id)) return true;
  return false;
};

async function updateRecipes(idRecipe, id, recipe) {
  const { name, ingredients, preparation } = recipe;
  const verifyAdministrator = await verifyAdmin(id, idRecipe);

  if (verifyAdministrator) return { message: 'err' };

  await model.updateRecipes(name, ingredients, preparation, id);
  return { _id: idRecipe, name, ingredients, preparation, id };
}

module.exports = {
  createRecipes,
  getRecipes,
  getRecipesById,
  updateRecipes,
};
