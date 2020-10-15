const { ObjectID } = require('mongodb');
const models = require('../models');

const validateOwner = async (userId, recipeId) =>
  models.getRecipe({ _id: ObjectID(recipeId) }).then((recipe) => {
    if (!recipe) return { error: true, message: 'Sem receita' };
    if (recipe.userId !== userId) return { error: true, message: 'não é sua receita' };
    return recipe;
  });

module.exports = validateOwner;
