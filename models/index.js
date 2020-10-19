const {
  getUserByEmail,
  getUserById,
  register,
} = require('./LoginModel');

const {
  create,
  getAll,
  getById,
  edit,
  deleteIt,
  addImage,
} = require('./RecipeModel');

module.exports = {
  register,
  getUserByEmail,
  getUserById,
  create,
  edit,
  addImage,
  deleteIt,
  getAll,
  getById,
};
