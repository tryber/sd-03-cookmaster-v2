const jwt = require('jsonwebtoken');
const recipesModel = require('../models/recipesModel');

const secretKey = 'MinhaSenhaSecreta123';
const options = { expiresIn: '1d', algorithm: 'HS256' };

const sign = (userData) => {
  const { _id, email, role } = userData;
  const payload = { _id, email, role };
  return jwt.sign(payload, secretKey, options);
};

const auth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return next({ status: 401, message: 'missing auth token' });
  try {
    const user = jwt.verify(authorization, secretKey, { algorithm: options.algorithm });
    req.user = user;
    next();
  } catch (error) {
    next({ status: 401, message: 'jwt malformed' });
  }
};

const roleValidation = async (req, _res, next) => {
  const { id } = req.params;
  const { user } = req;
  if (user.role !== 'admin') {
    const recipe = await recipesModel.getRecipeById(id);
    const userId = user._id;
    if (recipe[0].userId !== userId) {
      return next({ status: 401, message: 'You have not permission for update this recipe' });
    }
  }
  next();
};

module.exports = {
  sign,
  auth,
  roleValidation,
};
