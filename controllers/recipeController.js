const jwt = require('jsonwebtoken');
const services = require('../services');
const userController = require('./userController');

const createRecipe = async (req, res) => {
  const token = req.headers.authorization;
  const segredo = 'cookmaster_v2';
  const decoded = jwt.verify(token, segredo);
  const { name, ingredients, preparation } = req.body;
  const result = await services.recipeServices
    .createNewRecipe(name, ingredients, preparation, decoded[0]);

  if (result) {
    if (result.message) {
      return res.status(result.status).send({ message: result.message });
    }
  }

  res.status(201).send(result);
};

const showAllRecipes = async (req, res) => {
  const result = await services.recipeServices.getAllRecipes();
  res.status(200).send(result);
};

const showRecipe = async (req, res) => {
  const { id } = req.params;
  
  const idValidation = userController.validateId(id);

  if (idValidation) {
    return res.status(404).send({ message: 'recipe not found'});
  }

  const result = await services.recipeServices.getRecipe(id);

  if (!result) {
    return res.status(404).send({ message: 'recipe not found'});
  }
  res.status(200).send(result);
};

module.exports = {
  createRecipe,
  showAllRecipes,
  showRecipe,
};
