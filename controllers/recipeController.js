const { Router } = require('express');
const rescue = require('express-rescue');
const multer = require('multer');
const path = require('path');
const { recipeService } = require('../services');
const { validateJWT } = require('../middlewares/auth');

const recipes = Router();

recipes.post(
  '/',
  validateJWT,
  rescue(async (req, res) => {
    const { name, ingredients, preparation } = req.body;
    const { user } = req;

    const createdRecipe = await recipeService.createRecipe(name, ingredients, preparation, user);

    if (createdRecipe.message) return res.status(400).json({ message: createdRecipe.message });

    return res.status(201).json({ recipe: createdRecipe });
  }),
);

recipes.get(
  '/',
  rescue(async (_req, res) => {
    const allRecipes = await recipeService.getAllRecipes();

    return res.status(200).json(allRecipes);
  }),
);

recipes.get(
  '/:id',
  rescue(async (req, res) => {
    const { id } = req.params;

    const recipe = await recipeService.getRecipeById(id);

    if (recipe.message) return res.status(404).json(recipe);

    return res.status(200).json(recipe);
  }),
);

recipes.put(
  '/:id',
  validateJWT,
  rescue(async (req, res) => {
    const { name, ingredients, preparation } = req.body;
    const { user } = req;
    const { id } = req.params;

    const editRecipe = await recipeService.editRecipe(id, name, ingredients, preparation, user);

    return res.status(200).json(editRecipe);
  }),
);

module.exports = recipes;
