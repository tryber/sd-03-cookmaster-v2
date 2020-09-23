const { Router } = require('express');
const path = require('path');
const multer = require('multer');

const {
  CreateRecipe, DeleteRecipe, GetAllRecipes, GetRecipeById, UpdateRecipe, UpdateRecipeImage,
} = require('../services/recipesServices');

const auth = require('../middlewares/authMiddleware');

const recipesRoute = Router();

const getAllRecipes = async (_req, res) => {
  const recipes = await GetAllRecipes();
  res.status(200).json(recipes);
};

const getRecipeById = async (req, res) => {
  const { id } = req.params;
  const { ok, status, message, recipe } = await GetRecipeById(id);
  if (ok) return res.status(status).json(recipe);
  return res.status(status).json({ message });
};

const updateRecipe = async (req, res) => {
  const {
    user: { id: userId, role },
    body: { name, ingredients, preparation },
    params: { id },
  } = req;
  const {
    ok, status, message, recipe,
  } = await UpdateRecipe(userId, role, id, name, ingredients, preparation);
  if (ok) return res.status(status).json(recipe);
  return res.status(status).json({ message });
};

const createRecipe = async (req, res) => {
  const { user: { id }, body: { name, ingredients, preparation } } = req;
  const { ok, status, message, recipe } = await CreateRecipe(id, name, ingredients, preparation);
  if (ok) {
    return res.status(status).json({ recipe });
  }
  return res.status(status).json({ message });
};

const deleteRecipe = async (req, res) => {
  const { user, params: { id } } = req;
  const { ok, status } = await DeleteRecipe(user.id, user.role, id);
  if (ok) return res.status(status).json();
  return res.status(status).json();
};

const storage = multer.diskStorage({
  destination: path.join(__dirname, 'images'),
  filename: (req, _file, cb) => { cb(null, `${req.params.id}.jpeg`); },
});
const upload = multer({ storage });

const updateImage = async (req, res) => {
  const { file: { filename } = {}, params: { id } } = req;
  const { ok, data } = await UpdateRecipeImage(id, `localhost:3000/images/${filename}`);
  return ok ? res.status(200).json(data) : res.send(ok);
};

recipesRoute.route('/').get(getAllRecipes).post(auth(true), createRecipe);

recipesRoute
  .route('/:id')
  .get(auth(false), getRecipeById)
  .put(auth(true), updateRecipe)
  .delete(auth(true), deleteRecipe);

recipesRoute
  .route('/:id/image')
  .put(auth(true), upload.single('img'), updateImage);

module.exports = recipesRoute;
