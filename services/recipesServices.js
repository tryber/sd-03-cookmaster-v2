const {
  createRecipe, deleteRecipe, getAllRecipes, getRecipeById, updateRecipe,
} = require('../models/recipesModel');

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

const UpdateRecipe = async (userIdFromToken, role, id, name, ingredients, preparation) => {
  const { ok } = ValidateRecipe(name, ingredients, preparation);
  const { userId } = await getRecipeById(id);
  if (ok || role === 'admin' || userId === userIdFromToken) {
    const recipe = await updateRecipe(id, name, ingredients, preparation, userIdFromToken);
    return { ok: true, status: 200, message: '', recipe };
  }
  return { ok, status: 422, message: 'Invalid data' };
};

const DeleteRecipe = async (userIdFromToken, role, recipeId) => {
  console.log(userIdFromToken)
  const { userId } = await getRecipeById(recipeId);
  if (role === 'admin' || userId === userIdFromToken) {
    await deleteRecipe(recipeId);
    return { ok: true, status: 204 };
  }
  return { ok: false, status: 500 };
};

module.exports = {
  CreateRecipe,
  DeleteRecipe,
  GetAllRecipes,
  GetRecipeById,
  UpdateRecipe,
};
