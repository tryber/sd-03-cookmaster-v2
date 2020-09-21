const { Router } = require('express');
const {
  createRecipe,
  deleteRecipe,
  getAllRecipes,
  getRecipeById,
  updateImage,
  updateRecipe,
} = require('../controllers/recipesController');

const recipesRoute = Router();

// Listar receitas
recipesRoute.get('/', getAllRecipes);

// Listar uma receita específica
recipesRoute.get('/:id', getRecipeById);

// Editar uma receita
recipesRoute.put('/:id', updateRecipe);

// Adicionar uma imagem
recipesRoute.put('/:id/image', updateImage);

// Criar uma receita
recipesRoute.post('/', createRecipe);

// Excluir uma receita
recipesRoute.delete('/:id', deleteRecipe);

module.exports = recipesRoute;
