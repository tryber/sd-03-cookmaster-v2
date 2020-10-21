const express = require('express');
const rescue = require('express-rescue');

const { recipesServices } = require('../services');
const { auth } = require('../middlewares');

const RecipesRouter = express.Router();

const CheckNewRecipe = (req, res, next) => {
  const { user } = req;

  if (!user) res.status(401).json({ message: 'Invalid Token' });

  const { name, ingredients, preparation } = req.body;
  if (!name || !ingredients || !preparation) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  next();
};

const createRecipe = rescue(async (req, res) => {
  const {
    user: { _id: id },
    body: { name, ingredients, preparation } = {},
  } = req;
  const recipe = await recipesServices.addRecipe(id, { name, ingredients, preparation });
  return res.status(201).json({ recipe });
});

RecipesRouter.route('/').post(auth, CheckNewRecipe, createRecipe);

module.exports = RecipesRouter;
