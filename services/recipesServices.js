const {
  createRecipe, deleteRecipe, getAllRecipes, getRecipeById, updateRecipe, updateRecipeImage,
} = require('../models/recipesModel');

const ValidateRecipe = (name, ingredients, preparation) => {
  switch (true) {
    case !name || !ingredients || !preparation:
      return { isValid: false, status: 400, message: 'Invalid entries. Try again.' };
    default:
      return { isValid: true, status: 201 };
  }
};

const CreateRecipe = async (id, name, ingredients, preparation) => {
  const { isValid, status, message } = ValidateRecipe(name, ingredients, preparation);
  if (isValid) {
    const createdRecipe = await createRecipe(id, name, ingredients, preparation);
    return { isValid, status, message, recipe: createdRecipe };
  }
  return { isValid, status, message };
};

const GetAllRecipes = async () => getAllRecipes();

const GetRecipeById = async (id) => {
  const valid = id && id.length === 24;
  if (!valid) return { isValid: false, status: 404, message: 'recipe not found' };
  const recipe = await getRecipeById(id);
  return { isValid: true, status: 200, recipe };
};

const UpdateRecipe = async (tokenUserId, role, id, name, ingredients, preparation) => {
  const { isValid } = ValidateRecipe(name, ingredients, preparation);
  const { userId } = await getRecipeById(id);
  if (isValid || role === 'admin' || userId === tokenUserId) {
    const recipe = await updateRecipe(id, name, ingredients, preparation, tokenUserId);
    return { isValid: true, status: 200, message: '', recipe };
  }
  return { isValid, status: 422, message: 'Invalid data' };
};

const DeleteRecipe = async (tokenUserId, role, recipeId) => {
  const { userId } = await getRecipeById(recipeId);
  if (role === 'admin' || userId === tokenUserId) {
    await deleteRecipe(recipeId);
    return { isValid: true, status: 204 };
  }
  return { isValid: false };
};

const UpdateRecipeImage = async (recipeId, image) => {
  const recipe = await getRecipeById(recipeId);
  if (recipe) {
    await updateRecipeImage(recipeId, image);
    return { isValid: true, data: { ...recipe, image } };
  }
  return { isValid: false };
};

module.exports = {
  CreateRecipe,
  DeleteRecipe,
  GetAllRecipes,
  GetRecipeById,
  UpdateRecipe,
  UpdateRecipeImage,
};
