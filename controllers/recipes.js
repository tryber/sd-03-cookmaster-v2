const express = require('express');
const rescue = require('express-rescue');
const Boom = require('boom');

const { recipesServices } = require('../services');
const { auth } = require('../middlewares');

const recipesRouter = express.Router();

const validateNewRecipe = (req, _res, next) => {
  const { user } = req;

  if (!user) return next(Boom.unauthorized('Invalid Token'));

  const { name, ingredients, preparation } = req.body;
  if (!name || !ingredients || !preparation) {
    return next(Boom.badRequest('Invalid entries. Try again.'));
  }

  next();
}

const createRecipe = rescue(async (req, res) => {
  const { user, body: { name, ingredients, preparation } = {} } = req;
  const recipe = await recipesServices.addRecipe(user._id, { name, ingredients, preparation });
  return res.status(201).json({ recipe });
});

recipesRouter.route('/')
  .post(auth, validateNewRecipe, createRecipe);

module.exports = recipesRouter;
