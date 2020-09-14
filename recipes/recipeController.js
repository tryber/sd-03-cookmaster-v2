const service = require('./recipeService');

const registerRecipe = async (req, res, next) => {
  try {
    const { body } = req;
    const { _id: id } = req.user;
    const recipe = await service.createRecipe(body, id);
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
    console.log('recipe', recipe);
    if (recipe) return res.status(404).json({ message: 'recipe not found' });
    return res.status(200).json(recipe);
  } catch (err) {
    console.log('findRecipeById error', err);
    next(err);
  }
};

module.exports = { registerRecipe, findRecipeById, listRecipes,
};
