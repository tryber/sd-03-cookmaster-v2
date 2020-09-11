const rescue = require('express-rescue');
const { recipesService } = require('../services');

const newRecipe = rescue(async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { userId } = req.user;

  const result = await recipesService.addRecipe({ name, ingredients, preparation, userId });

  if (result.error && result.error.message === 'Email already registered') {
    return res.status(409).json(result.error);
  }

  if (result.error) return res.status(400).json(result.error);

  return res.status(201).json(result);
});

module.exports = {
  newRecipe,
};
