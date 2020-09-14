const rescue = require('express-rescue');
const { Router } = require('express');
const multer = require('multer');
const path = require('path');
const authentication = require('../middlewares/authentication');
const recipesService = require('../services/recipesService');
const { recipeValidation, recipeIdValidation } = require('../middlewares/authUser');

const recipe = Router();

const storage = multer.diskStorage({
  destination: path.join(__dirname, 'uploads'),
  filename: (req, _file, callback) => {
    callback(null, req.params.id);
  },
});
const upload = multer({ storage });

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
  )
  .put(
    '/:id/image',
    authentication,
    recipeIdValidation,
    upload.single('image'),
    rescue(async (req, res) => {
      const { id } = req.params;
      const { _id: userId } = req.user;
      const update = await recipesService.updateRecipeImage(id, userId);

      return res.status(200).json(update);
    }),
  )
  .put(
    '/:id',
    authentication,
    recipeIdValidation,
    rescue(async (req, res) => {
      const { id } = req.params;
      const { _id: userId } = req.user;
      const newRecipe = req.body;
      const updateRecipe = await recipesService.updateRecipe(id, userId, newRecipe);

      if (updateRecipe.message) return res.status(401).json(updateRecipe);
      return res.status(200).json(updateRecipe);
    }),
  )
  .delete(
    '/:id',
    recipeIdValidation,
    authentication,
    rescue(async (req, res) => {
      const { id } = req.params;
      const userId = req.user._id;

      await recipesService.deleteRecipe(id, userId);
      return res.status(204).end();
    }),
  );

module.exports = recipe;
