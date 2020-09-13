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
  console.log(recipesResult);
  return res.status(200).json(recipesResult);
}));

module.exports = recipes;
