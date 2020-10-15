const { ObjectID } = require('mongodb');
const models = require('../models');

const putImageOnRecipe = async (recipeId, image) =>
  models.getRecipe({ _id: ObjectID(recipeId) }).then((recipe) => {
    if (!recipe) return { error: true, message: 'No recipe' };
    return models.updateRecipe(recipeId, { image }).then(() => ({ image, ...recipe }));
  });

module.exports = putImageOnRecipe;
