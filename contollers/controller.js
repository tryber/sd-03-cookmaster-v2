const services = require('../services/services');

const showAllUsers = async (req, res) => {
  const users = await services.showAllUsers();
  res.status(200).json(users);
};

const createUser = async (req, res) => {
  const user = await services.createUser(req.body);
  if (user.message) return res.status(user.code).json({ message: user.message });
  return res.status(201).json({ user });
};

const userLogin = async (req, res) => {
  const token = await services.userLogin(req.body);
  if (token.message) return res.status(token.code).json({ message: token.message });
  return res.status(200).json({ token });
};

const createRecipe = async (req, res) => {
  const recipe = await services.createRecipe(req.body, req.user.email);
  if (recipe.code) { res.status(recipe.code).json({ message: recipe.message }); }
  return res.status(201).json({ recipe });
};

const getAllRecipes = async (req, res) => {
  const recipes = await services.getAllRecipes();
  res.status(200).json(recipes);
};

const getRecipe = async (req, res) => {
  const { id } = req.params;
  const recipe = await services.getRecipe(id);
  if (recipe.code) return res.status(recipe.code).json({ message: recipe.message });
  res.status(200).json(recipe);
};

const updateRecipe = async (req, res) => {
  const { params: { id }, user } = req;
  const recipe = await services.getRecipe(id);
  if (recipe.code) return res.status(recipe.code).json({ message: recipe.message });
  const update = await services.updateRecipe(req.body, id, user);
  if (update.code) return res.status(update.code).json({ message: update.message });
  res.status(200).json(update);
};

const deleteRecipe = async (req, res) => {
  const { params: { id }, user } = req;
  const recipe = await services.getRecipe(id);
  if (recipe.code) return res.status(recipe.code).json({ message: recipe.message });
  const deleted = await services.deleteRecipe(id, user);
  if (deleted.code) return res.status(deleted.code).json({ message: deleted.message });
  return res.status(204).send('No body returned for response');
};

const uploadImage = async (req, res) => {
  const { params: { id }, user, file: { mimetype } } = req;
  const extension = mimetype.slice(mimetype.indexOf('/') + 1);
  const recipe = await services.getRecipe(id);
  if (recipe.code) return res.status(recipe.code).json({ message: recipe.message });
  const upload = await services.uploadImage(id, user, extension);
  if (upload.code) return res.status(upload.code).json({ message: upload.message });
  res.status(200).json(upload);
};

const createAdmin = async (req, res) => {
  const admin = await services.createAdmin(req.body, req.user);
  if (admin.message) return res.status(admin.code).json({ message: admin.message });
  return res.status(201).json({ user: admin });
};

module.exports = {
  showAllUsers,
  createUser,
  userLogin,
  createRecipe,
  getAllRecipes,
  getRecipe,
  updateRecipe,
  deleteRecipe,
  uploadImage,
  createAdmin,
};
