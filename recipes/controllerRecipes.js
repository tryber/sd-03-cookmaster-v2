const { Router } = require('express');
const service = require('./serviceRecipes');

const recipes = Router();

recipes.post('/', (req, res) => {
  const { name, ingredients, preparation } = req.body;

  if (!name || !ingredients || !preparation) {
    return res.status(422).json({ message: 'Invalied entries. Try again.' });
  }
  return res.status(201)
    .json({ message: 'criado', data: req.body });
});

module.exports = recipes;
