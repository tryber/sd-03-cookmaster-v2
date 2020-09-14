const { Router } = require('express');
const rescue = require('express-rescue');
const Boom = require('@hapi/boom');
const validateJWT = require('../middlewares/validateJWT');
const recipesService = require('./recipesService');
const { verifyId, verifyUserRecipePermission } = require('../middlewares/errorHandler.js');
const schemas = require('./schemas');

const recipesRouter = Router();

const newRecipe = rescue(async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  const { error } = schemas.recipeSchema.validate({ name, ingredients, preparation });
  if (error) return next(Boom.badRequest('Invalid entries. Try again.', 'invalid_data'));
  const { _id } = req.user;
  const recipe = await recipesService.addRecipe(name, ingredients, preparation, _id);
  res.status(201).json({ recipe });
});

const listRecipes = rescue(async (_req, res) => {
  const recipes = await recipesService.getAllRecipes();
  return res.status(200).json(recipes);
});

const getRecipeById = rescue(async (req, res, next) => {
  const { id } = req.params;
  const result = await recipesService.getRecipeById(id);
  if (!result) return next(Boom.notFound('Recipe not found', 'not_found'));
  return res.status(200).json(result);
});

const editRecipe = rescue(async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  const result = await recipesService.editRecipe(id, name, ingredients, preparation);
  return res.status(200).json(result);
});

const deleteRecipe = rescue(async (req, res) => {
  const { id } = req.params;
  const result = await recipesService.deleteRecipe(id);
  res.status(204).json(result);
});

recipesRouter.route('/').post(validateJWT, newRecipe).get(listRecipes);

recipesRouter
  .route('/:id')
  .get(verifyId, getRecipeById)
  .put(validateJWT, verifyId, verifyUserRecipePermission, editRecipe)
  .delete(validateJWT, verifyId, verifyUserRecipePermission, deleteRecipe);

module.exports = recipesRouter;
