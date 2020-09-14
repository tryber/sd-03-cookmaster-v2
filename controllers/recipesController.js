const { Router } = require('express');
const rescue = require('express-rescue');
const recipesServices = require('../services/recipesService');
const { jwtDecodification } = require('./loginController');

const recipes = Router();

recipes.post('/', rescue(async (req, res) => {
  const { authorization } = req.headers;
  const userInfo = await jwtDecodification(authorization);
  const result = await recipesServices.createRecipeService(req.body, userInfo, authorization);
  if (result !== undefined) {
    if (result.code === 'invalid_token') return res.status(401).json(result);
    if (result.code === 'no_name') return res.status(400).json(result);
    return res.status(201).json(result);
  }
}));

recipes.get('/', rescue(async (_req, res) => {
  const recipesResult = await recipesServices.listRecipesService();
  return res.status(200).json(recipesResult);
}));

recipes.get('/:id', rescue(async (req, res) => {
  const { id } = req.params;
  const recipesResult = await recipesServices.RecipeByIdService(id);
  if (recipesResult && recipesResult.code === 'not_found') return res.status(404).json(recipesResult);
  return res.status(200).json(recipesResult);
}));

recipes.put('/:id', rescue(async (req, res) => {
  const { authorization } = req.headers;
  const userInfo = await jwtDecodification(authorization);
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  const recipesResult = await recipesServices.RecipeEditService(id, authorization, name, ingredients, preparation, userInfo);
  if (recipesResult && recipesResult.code === 'not_logged') return res.status(401).json(recipesResult);

  if (recipesResult && recipesResult.code === 'invalid_token') return res.status(401).json(recipesResult);

  return res.status(200).json(recipesResult);
}));
module.exports = recipes;
