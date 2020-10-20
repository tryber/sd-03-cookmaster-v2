const { Router } = require('express');
const rescue = require('express-rescue');
const multer = require('multer');
const { recipeService } = require('../services');
const { validateJWT } = require('../middlewares/auth');

const recipes = Router();

recipes.post(
  '/',
  validateJWT,
  rescue(async (req, res) => {
    const { name, ingredients, preparation } = req.body;
    const { _id } = req.user;

    const createdRecipe = await recipeService.createRecipe(name, ingredients, preparation, _id);

    if (createdRecipe.message) return res.status(400).json({ message: createdRecipe.message });

    return res.status(201).json({ recipe: createdRecipe });
  }),
);

recipes.get(
  '/',
  rescue(async (_req, res) => {
    const allRecipes = await recipeService.getAllRecipes();

    return res.status(200).json(allRecipes);
  }),
);

recipes.get(
  '/:id',
  rescue(async (req, res) => {
    const { id } = req.params;

    const recipe = await recipeService.getRecipeById(id);

    if (recipe.message) return res.status(404).json(recipe);

    return res.status(200).json(recipe);
  }),
);

recipes.put(
  '/:id',
  validateJWT,
  rescue(async (req, res) => {
    const { name, ingredients, preparation } = req.body;
    const { user } = req;
    const { id } = req.params;

    const editRecipe = await recipeService.editRecipe(id, name, ingredients, preparation, user);

    return res.status(200).json(editRecipe);
  }),
);

recipes.delete(
  '/:id',
  validateJWT,
  rescue(async (req, res) => {
    const { id } = req.params;

    await recipeService.deleteRecipe(id);

    return res.status(204).end();
  }),
);

// Referência para utilização do multer:
// https://github.com/tryber/sd-03-live-lectures/pull/12

const storage = multer.diskStorage({
  destination: 'images',
  filename: (req, _file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
});

const upload = multer({ storage });

recipes.put(
  '/:id/image',
  validateJWT,
  upload.single('image'),
  rescue(async (req, res) => {
    const { id } = req.params;
    const { filename } = req.file;

    const addedImage = await recipeService.addImageToRecipe(id, filename);

    return res.status(200).json(addedImage);
  }),
);

module.exports = recipes;
