const { Router } = require('express');
const rescue = require('express-rescue');
const multer = require('multer');
const path = require('path');
const services = require('../services');
const middleware = require('../middleware');

const recipesRoute = Router();

const checkNewRecipe = (req, res, next) => {
  const { user } = req;

  if (!user) return res.status(401).json({ error: 'Token invalidos' });

  if (!req.body.name || !req.body.ingredients || !req.body.preparation) {
    return res.status(400).json({ error: 'Dados invalidos' });
  }

  next();
};

const createRecipe = rescue(async (req, res) => {
  const {
    user: { _id: id },
    body: { name, ingredients, preparation } = {},
  } = req;
  const recipe = await services.createRecipe(id, { name, ingredients, preparation });
  return res.status(201).json({ recipe });
});

const getAllRecipes = rescue(async (req, res) => {
  const recipes = await services.getRecipes();
  res.status(200).json(recipes);
});

const getRecipe = rescue(async (req, res) => {
  const { id } = req.params;

  if (id.length !== 24) return res.status(404).json({ error: 'Receita não encontrada' });

  const recipe = await services.getRecipeById(id);

  if (!recipe) return res.status(404).json({ error: 'Receita não encontrada' });

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

  const permission = await services.validateOwner(userId, id);

  if (permission.error) return res.status(401).json({ error: 'Sem permissão' });

  res.permission = permission;

  next();
});

const updateRecipe = rescue(async (req, res) => {
  const {
    params: { id },
    body: { name, ingredients, preparation },
  } = req || {};

  const newRecipe = await services.updateRecipe(id, name, ingredients, preparation);

  res.status(200).json(newRecipe);
});

const deleteRecipe = rescue(async (req, res) =>
  services.deleteRecipe(req.params.id).then(() => res.status(204).end()));

const storage = multer.diskStorage({
  destination: path.join(__dirname, 'images'),
  filename: (req, file, cb) => {
    const { id } = req.params;
    cb(null, `${id}.jpeg`);
  },
});

const upload = multer({ storage });

const putImage = rescue(async (req, res) => {
  const { params: { id }, file: { filename } = {} } = req;
  const recipe = await services.putImageOnRecipe(id, `localhost:3000/images/${filename}`);

  return res.status(200).json(recipe);
});

recipesRoute.route('/').post(middleware.auth, checkNewRecipe, createRecipe).get(getAllRecipes);

recipesRoute
  .route('/:id')
  .get(getRecipe)
  .put(middleware.auth, evaluatePermission, checkNewRecipe, updateRecipe)
  .delete(middleware.auth, evaluatePermission, deleteRecipe);

recipesRoute.route('/:id/image')
  .put(middleware.auth, evaluatePermission, upload.single('image'), putImage);

module.exports = recipesRoute;
