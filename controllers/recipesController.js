const { Router } = require('express');
const rescue = require('express-rescue');
const recipesServices = require('../services/recipesService');
const { jwtDecodification } = require('./loginController');

const recipes = Router();

recipes.post('/', rescue(async (req, res) => {
  const userInfo = await jwtDecodification(req.headers.authorization);
  const result = await recipesServices.createRecipeService(req.body, userInfo, req.headers.authorization);
  if (result.code) {
    if (result.code === 'invalid_token') return res.status(401).json(result);

    return res.status(400).json(result);
  }
  return res.status(201).json(result);
}));

module.exports = recipes;
