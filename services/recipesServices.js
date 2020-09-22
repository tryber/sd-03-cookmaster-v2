const { createRecipe, getAllRecipes, getRecipeById } = require('../models/recipesModel');

const ValidateRecipe = (name, ingredients, preparation) => {
  switch (true) {
    case !name || !ingredients || !preparation:
      return { ok: false, status: 400, message: 'Invalid entries. Try again.' };
    default:
      return { ok: true, status: 201 };
  }
};

const CreateRecipe = async (id, name, ingredients, preparation) => {
  const { ok, status, message } = ValidateRecipe(name, ingredients, preparation);
  if (ok) {
    const createdRecipe = await createRecipe(id, name, ingredients, preparation);
    return { ok, status, message, recipe: createdRecipe };
  }
  return { ok, status, message };
};

const GetAllRecipes = async () => getAllRecipes();

const GetRecipeById = async (id) => {
  const valid = id && id.length === 24;
  if (!valid) return { ok: false, status: 404, message: 'recipe not found' };
  const recipe = await getRecipeById(id);
  return { ok: true, status: 200, recipe };
};

module.exports = {
  CreateRecipe,
  GetAllRecipes,
  GetRecipeById,
};
