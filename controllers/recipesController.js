const rescue = require('express-rescue');
const { Router } = require('express');
const authentication = require('../middlewares/authentication');
const recipesService = require('../services/recipesService');
const { recipeValidation, recipeIdValidation} = require('../middlewares/authUser');

const recipe = Router();

recipe
  .post(
    '/',
    authentication,
    recipeValidation,
    rescue(async (req, res) => {
      const { name, ingredients, preparation } = req.body;
      const { _id: userId } = req.user;
      const createdRevenue = await recipesService.createRecipe(
        name,
        ingredients,
        preparation,
        userId,
      );

      return res.status(201).json(createdRevenue);
    }),
  )
  .get(
    '/:id',
    recipeIdValidation,
    rescue(async (req, res) => {
      const { id } = req.params;
      const recipeId = await recipesService.findRecipeById(id);
      console.log(recipeId)
      if (!recipeId) return res.status(404).json(recipeId);
      return res.status(200).json(recipeId);
    }),
  )
  .get(
    '/',
    rescue(async (_req, res) => {
      const recipes = await recipesService.findAllRecipes();
      return res.status(200).json(recipes);
    }),
  );

module.exports = recipe;
