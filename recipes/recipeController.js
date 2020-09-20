const service = require('./recipeService');

const registerRecipe = async (req, res, next) => {
  try {
    const { body } = req;
    const { _id: userId } = req.user;
    const recipe = await service.createRecipe(body, userId);
    return res.status(201).json(recipe);
  } catch (err) {
    console.log('register error', err);
    next(err);
  }
};

const listRecipes = async (_req, res, next) => {
  try {
    const recipes = await service.listRecipes();
    return res.status(200).json(recipes);
  } catch (err) {
    console.log('list error', err);
    next(err);
  }
};

const findRecipeById = async (req, res, next) => {
  try {
    const recipe = await service.findRecipeById(req.params.id);
    if (!recipe) return next('not_found');
    return res.status(200).json(recipe);
  } catch (err) {
    console.log('findRecipeById error', err);
    next('not_found');
  }
};

const updateRecipe = async (req, res, next) => {
  try {
    const recipe = await service.updateRecipe(req.body, req.params.id);
    if (!recipe) return next('not_found');

    return res.status(200).json(recipe);
  } catch (err) {
    next('not_found');
  }
};

const deleteRecipe = async (req, res, next) => {
  try {
    await service.deleteRecipe(req.params.id);
    return res.status(204).json();
  } catch (err) {
    next('noauth');
  }
};

module.exports = { registerRecipe, findRecipeById, listRecipes, updateRecipe, deleteRecipe,
};
