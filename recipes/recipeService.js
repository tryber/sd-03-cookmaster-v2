const Model = require('./recipeModel');

const createRecipe = async (data, id) => {
  const recipe = await Model.createRecipe(data, id);
  return { recipe: { userId: id, ...recipe, ...data } };
};

const listRecipes = async () => Model.getAll();

const findRecipeById = async (id) => Model.findById(id);

module.exports = { createRecipe, listRecipes, findRecipeById };
