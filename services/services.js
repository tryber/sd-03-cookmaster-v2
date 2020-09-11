const jwt = require('jsonwebtoken');
const model = require('../model/model');

const validate = async ({ name, email, password }) => {
  const emailRegx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!name || !email || !password) return { code: 400, message: 'Invalid entries. Try again.' };
  if (!email.match(emailRegx)) return { code: 400, message: 'Invalid entries. Try again.' };
  if (await model.getUserByEmail(email)) return { code: 409, message: 'Email already registered' };
  return true;
};

const validateLogin = async ({ email, password }) => {
  if (!email || !password) return { code: 401, message: 'All fields must be filled' };
  const { email: mail, password: pass, role, _id } = await model.getUserByEmail(email)
    || { email: undefined, password: undefined, role: undefined, _id: undefined };
  if (!mail || pass !== password) return { code: 401, message: 'Incorrect username or password' };

  return { email, role, _id };
};

const validateRecipe = ({ name, ingredients, preparation }) => {
  if (!name || !ingredients || !preparation) return { code: 400, message: 'Invalid entries. Try again.' };
  return true;
};

const getUserByEmail = (email) => {
  model.getUserByEmail(email);
};

const showAllUsers = async () => model.showAllUsers();

const createUser = async (userInfo) => {
  const { code, message } = await validate(userInfo);
  if (message) return { code, message };
  return model.createUser(userInfo);
};

const secret = 'teste1234';

const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const userLogin = async (userInfo) => {
  const { code, message, email, role, _id } = await validateLogin(userInfo);
  if (message) return { code, message };
  const token = jwt.sign({ email, role, _id }, secret, jwtConfig);
  return token;
};

const createRecipe = async (recipeInfo, email) => {
  const { code, message } = validateRecipe(recipeInfo);
  if (code) return { code, message };
  const { _id } = await model.getUserByEmail(email);
  return model.createRecipe(recipeInfo, _id);
};

const getAllRecipes = async () => model.getAllRecipes();

const getRecipe = async (id) => {
  if (id.length !== 24 || !id.match(/[0-9a-fA-F]+/)
    || !await model.getRecipe(id)) return { code: 404, message: 'recipe not found' };
  return model.getRecipe(id);
};

const updateRecipe = async (recipeInfo, recipeId, { role, _id }) => {
  const { userId } = await model.getRecipe(recipeId);
  if (parseInt(_id, 10) !== parseInt(userId, 10) && role !== 'admin') { return { code: 401, message: 'jwt malformed' }; }
  await model.updateRecipe(recipeInfo, recipeId);
  return { ...await model.getRecipe(recipeId), userId };
};

const deleteRecipe = async (recipeId, { role, _id }) => {
  const { userId } = await model.getRecipe(recipeId);
  if (parseInt(_id, 10) !== parseInt(userId, 10) && role !== 'admin') { return { code: 401, message: 'jwt malformed' }; }
  return (await model.deleteRecipe(recipeId)).deletedCount;
};

const uploadImage = async (recipeId, { role, _id }, extension) => {
  const { userId } = await model.getRecipe(recipeId);
  if (parseInt(_id, 10) !== parseInt(userId, 10) && role !== 'admin') { return { code: 401, message: 'jwt malformed' }; }
  await model.uploadImage(recipeId, extension);
  return getRecipe(recipeId);
};

const createAdmin = async (adminInfo, { role }) => {
  const { code, message } = await validate(adminInfo);
  if (message) return { code, message };
  if (role !== 'admin') return { code: 403, message: 'Only admins can register new admins' };
  return model.createAdmin(adminInfo);
};

module.exports = {
  createUser,
  getUserByEmail,
  showAllUsers,
  userLogin,
  createRecipe,
  getAllRecipes,
  getRecipe,
  updateRecipe,
  deleteRecipe,
  uploadImage,
  createAdmin,
};
