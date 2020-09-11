const jwt = require('jsonwebtoken');

const services = require('../../services');
const { tokenKey } = require('../login/loginConfig');
const { generateError } = require('../../utils');

const validateTokenInfo = async (token, required) => {
  try {
    if (!required) return;

    if (required && !token) throw new Error('missing auth token');

    const decodedInfo = jwt.verify(token, tokenKey);
    const { _id } = decodedInfo.data;

    const userData = await services.SearchUser(null, _id);

    if (!userData) throw new Error('invalid token');

    return { ...userData };
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = (required = true) => async (req, _res, next) => {
  try {
    const { authorization } = req.headers;

    if (!required) return next();

    const validateInfo = await validateTokenInfo(authorization, required);
    req.user = validateInfo;

    return next();
  } catch (error) {
    return next(generateError(401, error));
  }
};
