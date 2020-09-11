const jwt = require('jsonwebtoken');
const services = require('../services');

const createRecipe = async (req, res) => {
  const token = req.headers['authorization'];
  const segredo = 'cookmaster_v2';
  const decoded = jwt.verify(token, segredo);
  const { name, ingredients, preparation } = req.body;
  const result = await services.recipeServices.createNewRecipe(name, ingredients, preparation, decoded[0]);

  if (result && result.message) {
    return res.status(result.status).send({ message: result.message });
  }
  res.status(201).send(result);
};

module.exports = {
  createRecipe,
};
