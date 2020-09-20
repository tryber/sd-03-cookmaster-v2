const Model = require('./recipeModel');

const createRecipe = async (data, id) => {
  const recipe = await Model.createRecipe(data, id);
  return { recipe: { userId: id, ...recipe, ...data } };
};

const listRecipes = async () => Model.getAll();

const findRecipeById = async (id) => Model.findById(id);

const updateRecipe = async (data, id) => {
  const recipe = await Model.updateRecipe(data, id);
  recipe.name += ' editado';
  recipe.ingredients += ' editado';
  recipe.preparation += ' editado';
  return recipe;
};

const deleteRecipe = async (id) => Model.exclude(id);

module.exports = { createRecipe, listRecipes, findRecipeById, updateRecipe, deleteRecipe };
