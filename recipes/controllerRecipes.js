const { Router } = require('express');
const service = require('./serviceRecipes');

const recipes = Router();

recipes.post('/recipes', async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { user } = req;
  console.log(user)

  // if (!user) {
  //   return res.status(401).json({ message: 'user not found' });
  // }

  if (!name || !ingredients || !preparation) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }
  await service.createRecipes(name, ingredients, preparation, 'a');
  return res.status(201).json({ message: 'criado', data: req.body });
});

recipes.get('/recipes', async (req, res) => {
  const result = await service.getRecipes();
  return res.status(200).json([result]);
});

recipes.get('/recipes/:id', async (req, res) => {
  const { id } = req.params;
});

module.exports = recipes;
