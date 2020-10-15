const { ObjectID } = require('mongodb');
const models = require('../models');

const getRecipeById = async (id) => models.getRecipe({ _id: ObjectID(id) });

module.exports = getRecipeById;
