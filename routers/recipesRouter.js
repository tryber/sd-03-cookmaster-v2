const { Router } = require('express');
const {
  createRecipe,
  deleteRecipe,
  getAllRecipes,
  getRecipeById,
  updateImage,
  updateRecipe,
} = require('../controllers/recipesController');

// Listar receitas
Router.get('/', getAllRecipes);

// Listar uma receita específica
Router.get('/:id', getRecipeById);

// Editar uma receita
Router.put('/:id', updateRecipe);

// Adicionar uma imagem
Router.put('/:id/image', updateImage);

// Criar uma receita
Router.post('/', createRecipe);

// Excluir uma receita
Router.delete('/:id', deleteRecipe);
