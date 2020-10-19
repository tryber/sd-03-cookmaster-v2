const {
  getUserByEmail,
  getUserById,
  registerUser,
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
  registerUser,
  getUserByEmail,
  getUserById,
  create,
  edit,
  addImage,
  deleteIt,
  getAll,
  getById,
};
