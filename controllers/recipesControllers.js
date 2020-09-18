const path = require('path');
const multer = require('multer');
const { Router } = require('express');
const rescue = require('express-rescue');
const validateJWT = require('../middlewares/auth');

const recipesService = require('../service/recipesService');

const recipes = Router();

const storage = multer.diskStorage({
  destination: path.join(__dirname, 'uploads'),
  filename: (req, file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
});

const upload = multer({ storage });

recipes.get('/', rescue(async (_, res) => {
  const product = await recipesService.getAllRecipes();

  return res.status(200).json(product);
}));

recipes.get('/:id', rescue(async (req, res) => {
  const { id } = req.params;

  const recipe = await recipesService.getRecipeById(id);

  if (recipe.error) {
    return res.status(recipe.cod).json({
      message: recipe.message,
    });
  }

  return res.status(200).json(recipe);
}));

recipes.post('/', validateJWT, rescue(async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id } = req.user;

  const recipe = await recipesService.createRecipe(name, ingredients, preparation, _id);

  if (recipe.error) {
    return res.status(recipe.cod).json({
      message: recipe.message,
    });
  }

  return res.status(201).json(recipe);
}));

recipes.put('/:id', validateJWT, rescue(async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  const { _id, role } = req.user;

  const recipe = await recipesService.updateRecipe(id, name, ingredients, preparation, _id, role);

  if (recipe.error) {
    return res.status(recipe.cod).json({
      message: recipe.message,
    });
  }

  return res.status(200).json(recipe);
}));

recipes.delete('/:id', validateJWT, rescue(async (req, res) => {
  const { id } = req.params;
  const { _id, role } = req.user;

  const deleted = await recipesService.deleteRecipe(id, _id, role);

  if (deleted.error) {
    return res.status(deleted.cod).json({
      message: deleted.message,
    });
  }

  return res.status(204).json(deleted);
}));

recipes.put('/:id/image', validateJWT, upload.single('image'), rescue(async (req, res) => {
  const { id } = req.params;
  const { _id, role } = req.user;

  const imagePath = `localhost:3000/images/${id}.jpeg`;

  const recipe = await recipesService.updateRecipeImage(id, imagePath, _id, role);

  return res.status(200).json(recipe);
}));

module.exports = recipes;
