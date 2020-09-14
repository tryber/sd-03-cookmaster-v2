const service = require('./recipeService');

const recipeNotFound = (res) => res.status(404).json({ message: 'recipe not found' });

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

const findRecipeById = async (req, res) => {
  try {
    const recipe = await service.findRecipeById(req.params.id);
    if (!recipe) return recipeNotFound(res);
    return res.status(200).json(recipe);
  } catch (err) {
    console.log('findRecipeById error', err);
    return recipeNotFound(res);
  }
};

const updateRecipe = async (req, res) => {
  try {
    const recipe = await service.updateRecipe(req.body, req.params.id);
    if (!recipe) return recipeNotFound(res);
    return res.status(200).json(recipe);
  } catch (err) {
    recipeNotFound(res);
  }
};

const deleteRecipe = async (req, res) => {
  try {
    await service.deleteRecipe(req.params.id);
    return res.status(204).json();
  } catch (err) {
    return res.status(401).json({ message: 'missing auth token' });
  }
};

module.exports = { registerRecipe, findRecipeById, listRecipes, updateRecipe, deleteRecipe,
};
