const { Router } = require('express');
const {
  createRecipe,
  deleteRecipe,
  getAllRecipes,
  getRecipeById,
  updateImage,
  updateRecipe,
} = require('../controllers/recipesController');
const auth = require('../middlewares/authMiddleware');

const recipesRoute = Router();

// Listar receitas
recipesRoute.get('/', auth(false), getAllRecipes);

// Listar uma receita específica
recipesRoute.get('/:id', auth(false), getRecipeById);

// Editar uma receita
recipesRoute.put('/:id', auth(true), updateRecipe);

// Adicionar uma imagem
recipesRoute.put('/:id/image', auth(true), updateImage);

// Criar uma receita
recipesRoute.post('/', auth(true), createRecipe);

// Excluir uma receita
recipesRoute.delete('/:id', auth(true), deleteRecipe);

module.exports = recipesRoute;
