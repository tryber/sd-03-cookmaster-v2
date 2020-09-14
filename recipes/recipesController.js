const { Router } = require('express');
const rescue = require('express-rescue');
const Boom = require('@hapi/boom');
const multer = require('multer');
const path = require('path');
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
  await recipesService.deleteRecipe(id);
  res.status(204).json();
});

const storage = multer.diskStorage({
  destination: path.join(__dirname, 'images'),
  filename: (req, _file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
});

const upload = multer({ storage });

const uploadImage = rescue(async (req, res, next) => {
  const { params: { id }, file: { filename } = {} } = req;
  const recipe = await recipesService.getRecipeById(id);
  if (!recipe) next(Boom.notFound('Recipe not found', 'not_found'));
  const image = await recipesService.uploadImage(id, `localhost:3000/images/${filename}`);

  return res.status(200).json({ ...recipe, image });
});

recipesRouter.route('/').post(validateJWT, newRecipe).get(listRecipes);

recipesRouter
  .route('/:id')
  .get(verifyId, getRecipeById)
  .put(validateJWT, verifyId, verifyUserRecipePermission, editRecipe)
  .delete(validateJWT, verifyId, verifyUserRecipePermission, deleteRecipe);

recipesRouter
  .route('/:id/image')
  .put(validateJWT, verifyId, verifyUserRecipePermission, upload.single('image'), uploadImage);

module.exports = recipesRouter;
