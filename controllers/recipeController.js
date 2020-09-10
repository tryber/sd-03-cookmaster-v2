const { Router } = require('express');
const rescue = require('express-rescue');
const { recipeService } = require('../services');
const { validateJWT } = require('../middlewares/auth');

const recipes = Router();

recipes.post(
  '/',
  validateJWT,
  rescue(async (req, res) => {
    const { name, ingredients, preparation } = req.body;
    const { user } = req;

    if (user.message) return res.status(401).json({ message: user.message });

    const createdRecipe = await recipeService.createNewRecipe(name, ingredients, preparation, user);

    if (createdRecipe.message) return res.status(400).json({ message: createdRecipe.message });

    return res.status(201).json({ recipe: createdRecipe });
  }),
);

module.exports = recipes;
