const { Router } = require('express');
const rescue = require('express-rescue');
const recipesServices = require('../services/recipesService');
const { jwtDecodification } = require('./loginController');

const recipes = Router();

recipes.post('/', rescue(async (req, res) => {
  let userInfo;
  let tokenStatus = 'valid_token';
  if (req.headers.authorization === null) {
    tokenStatus = 'invalid_token';
  }
  if (tokenStatus === 'valid_token') {
    userInfo = await jwtDecodification(req.headers.authorization);
  }
  const result = await recipesServices.createRecipeService(req.body, userInfo.data, tokenStatus);
  if (result.code) {
    return res.status(400).json(result);
  }
  return res.status(200).json('sucess');
}));

module.exports = recipes;
