const path = require('path');
const multer = require('multer');
const { Router } = require('express');
const rescue = require('express-rescue');

const { recipesController } = require('../controllers');
const { authMiddleware, recipeValidation } = require('../middlewares');

const recipe = Router();

const storage = multer.diskStorage({
  destination: path.join(__dirname, 'images'),
  filename: (req, _file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
});

const upload = multer({ storage });

recipe.get('/', rescue(recipesController.getAllRecipes));

recipe.post('/', authMiddleware(), recipeValidation, rescue(recipesController.createRecipe));

recipe.get('/:id', authMiddleware(false), rescue(recipesController.getRecipeById));

recipe.put('/:id', authMiddleware(), rescue(recipesController.editRecipe));

recipe.delete('/:id', authMiddleware(), rescue(recipesController.deleteRecipe));

recipe.put(
  '/:id/image',
  authMiddleware(),
  upload.single('image'),
  rescue(recipesController.editImageRecipe)
);

module.exports = recipe;
