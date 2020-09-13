const express = require('express');
const controllers = require('../controllers/index');
const { upload } = require('../middlewares/multer');
const validateJWT = require('../middlewares/validateJWT');

const recipesRoutes = express.Router();

recipesRoutes
  .post('/', validateJWT('jwt malformed'), controllers.recipesController.newRecipe)
  .put(
    '/:id/image',
    validateJWT('missing auth token'),
    upload.single('image'),
    controllers.recipesController.recipeForm,
  )
  .get('/:id', controllers.recipesController.getRecipeById)
  .put('/:id', validateJWT('missing auth token'), controllers.recipesController.updateRecipe)
  .delete('/:id', validateJWT('missing auth token'), controllers.recipesController.deleteRecipe)
  .get('/', controllers.recipesController.getAllRecipes);

module.exports = {
  recipesRoutes,
};
