const { Router } = require('express');
const rescue = require('express-rescue');
const multer = require('multer');
const path = require('path');
const recipeService = require('../services/recipeService');
const authMiddleware = require('../middlewares/authMiddleware');

const recipe = Router();

recipe.post('/', authMiddleware, rescue(async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id: userId } = req.user;
  const postRecipe = await recipeService.createRecipe(name, ingredients, preparation, userId);
  if (postRecipe.error) {
    return res.status(postRecipe.status).json({ message: postRecipe.message });
  }
  return res.status(201).json(postRecipe);
}));

recipe.get('/', async (_, res) => {
  const recipes = await recipeService.getAllRecipes();
  res.status(200).json(recipes);
});

recipe.get('/:id', async (req, res) => {
  const { id } = req.params;
  const getRecipe = await recipeService.getRecipeById(id);
  if (getRecipe.error) {
    return res.status(getRecipe.status).json({ message: getRecipe.message });
  }
  return res.status(200).json(getRecipe);
});

recipe.put('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  const { _id: userId } = req.user;
  const updatedRecipe = await recipeService.updateRecipe(
    id, { name, ingredients, preparation, userId },
  );
  if (updatedRecipe.error) {
    return res.status(updatedRecipe.status).json({ message: updatedRecipe.message });
  }
  return res.status(200).json(updatedRecipe);
});

recipe.delete('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.user;
  const deleteRecipe = await recipeService.deleteRecipe(id, userId);
  if (deleteRecipe.error) {
    return res.status(deleteRecipe.status).json({ message: deleteRecipe.message });
  }
  return res.status(204).end();
});

const storage = multer.diskStorage({
  destination: path.join(__dirname, 'images'),
  filename: (req, _file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
});

const upload = multer({ storage });

recipe.put('/:id/image', authMiddleware, upload.single('image'), rescue(async (req, res) => {
  const { id } = req.params;
  const { filename } = req.file;
  const { _id: userId } = req.user;
  const uploadRecipeImage = await recipeService.uploadRecipeImage(id, filename, userId);

  res.status(200).json(uploadRecipeImage);
}));

module.exports = recipe;
