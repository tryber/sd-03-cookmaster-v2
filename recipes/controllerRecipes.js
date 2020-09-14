const { Router } = require('express');
const service = require('./serviceRecipes');
const { userAuth } = require('../middlewares/userAuthentication');

const recipes = Router();

recipes.post('/', userAuth, async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id: userId } = req.user;

  if (!name || !ingredients || !preparation) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }
  const result = await service.createRecipes(name, ingredients, preparation, userId);
  return res.status(201).json({ recipe: result });
});

recipes.get('/', async (req, res) => {
  const result = await service.getRecipes();
  return res.status(200).json(result);
});

recipes.get('/:id', async (req, res) => {
  const { id } = req.params;

  const recipe = await service.getRecipesById(id);

  if (recipe.message) return res.status(404).json(recipe);

  return res.status(200).json(recipe);
});

module.exports = recipes;
