const express = require('express');
const rescue = require('express-rescue');
const Boom = require('boom');
const multer = require('multer');
const path = require('path');

const { recipesServices } = require('../services');
const { auth } = require('../middlewares');

const recipesRouter = express.Router();

const validateNewRecipe = (req, _res, next) => {
  const { user } = req;

  if (!user) return next(Boom.unauthorized('Invalid Token'));

  const { name, ingredients, preparation } = req.body;
  if (!name || !ingredients || !preparation) {
    return next(Boom.badRequest('Invalid entries. Try again.'));
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

const getAllRecipes = rescue(async (req, res) => {
  const recipes = await recipesServices.getRecipes();
  res.status(200).json(recipes);
});

const getRecipe = rescue(async (req, res, next) => {
  const { id } = req.params;

  if (id.length !== 24) return next(Boom.notFound('recipe not found'));

  const recipe = await recipesServices.getRecipeById(id);

  if (!recipe) return next(Boom.notFound('recipe not found'));

  return res.status(200).json(recipe);
});

const evaluatePermission = rescue(async (req, res, next) => {
  const {
    params: { id },
    user: { _id: userId, role },
  } = req || {};

  if (role === 'admin') {
    req.permission = true;
    return next();
  }

  const permission = await recipesServices.validateOwnerShip(userId, id);

  if (permission.error) return next(Boom.unauthorized(permission.message));

  res.permission = permission;

  next();
});

const updateRecipe = rescue(async (req, res) => {
  const {
    params: { id },
    body: { name, ingredients, preparation },
  } = req || {};

  const newRecipe = await recipesServices.updateRecipe(id, name, ingredients, preparation);

  res.status(200).json(newRecipe);
});

const deleteRecipe = rescue(async (req, res) =>
  recipesServices.deleteRecipe(req.params.id).then(() => res.status(204).end()),
);

const storage = multer.diskStorage({
  destination: path.join(__dirname, 'images'),
  filename: (req, file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
});

const upload = multer({ storage });

const putImage = rescue(async (req, res) => {
  const { params: { id }, file: { filename } = {} } = req;
  const recipe = await recipesServices.putImageOnRecipe(id, `localhost:3000/images/${filename}`);

  return res.status(200).json(recipe);
});

recipesRouter.route('/').post(auth, validateNewRecipe, createRecipe).get(getAllRecipes);

recipesRouter
  .route('/:id')
  .get(getRecipe)
  .put(auth, evaluatePermission, validateNewRecipe, updateRecipe)
  .delete(auth, evaluatePermission, deleteRecipe);

recipesRouter.route('/:id/image')
  .put(auth, evaluatePermission, upload.single('image'), putImage);

module.exports = recipesRouter;
