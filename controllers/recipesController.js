const { param, validationResult } = require('express-validator');
const { Router } = require('express');
const { loginService, recipesService } = require('../services');
const multer = require('multer');
const { ObjectId } = require('mongodb');

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, '../uploads');
  },
  filename: async (req, _file, cb) => {
    const id = ObjectId(req.params.id).toString();
    cb(null, id);
  },
});
const upload = multer({ storage });

const recipesRouter = Router();

const register = async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  if (!name || !ingredients || !preparation) {
    return next({ status: 400, message: 'Invalid entries. Try again.' });
  }
  try {
    const id = req.user['_id'];
    const recipeRegistered = await recipesService.register(name, ingredients, preparation, id);
    return res.status(201).json({ recipe: recipeRegistered });
  } catch (error) {
    return next({ status: 401, message: error.message });
  }
};

const getAllRecipes = async (req, res, next) => {
  try {
    const recipes = await recipesService.getAll();
    res.status(200).json(recipes);
  } catch (err) {
    next(err);
  }
};

const getRecipesById = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return next({ status: 404, message: 'recipe not found' });
  const { id } = req.params;
  const recipe = await recipesService.getRecipeById(id);
  if (!recipe) return next({ status: 404, message: 'recipe not found' });
  return res.status(200).json(recipe[0]);
};

const updateRecipe = async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  const { id } = req.params;
  if (!name || !ingredients || !preparation) {
    return next({ status: 400, message: 'Invalid entries. Try again.' });
  }

  const recipeUpdated = await recipesService.update(id, { name, ingredients, preparation });
  return res.status(200).json(recipeUpdated[0]);
};

const deleteRecipe = async (req, res) => {
  const { id } = req.params;
  await recipesService.deleteRecipe(id);
  return res.status(204).json();
};

const addImage = async (req, res) => {
  const { id } = req.params;
  const image = `localhost:3000/images/${req.file.filename}.jpeg`;
  const recipeUpdated = await recipesService.update(id, { image });
  return res.status(200).json(recipeUpdated[0]);
};

recipesRouter.route('/').post(loginService.auth, register).get(getAllRecipes);

recipesRouter
  .route('/:id/image')
  .put(loginService.auth, loginService.roleValidation, upload.single('image'), addImage);

recipesRouter
  .route('/:id')
  .get([param('id').isMongoId()], getRecipesById)
  .put(loginService.auth, loginService.roleValidation, updateRecipe)
  .delete(loginService.auth, loginService.roleValidation, deleteRecipe);

module.exports = recipesRouter;
