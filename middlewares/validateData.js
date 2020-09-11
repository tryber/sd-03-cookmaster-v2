const { body, param, validationResult } = require('express-validator');
const {
  RECIPE_NOT_FOUND,
  INVALID_ENTRY,
  INVALID_LOGIN_DATA,
  errMessage,
} = require('../services/errorsServices');

const userValidationRules = [
  body('email', errMessage(INVALID_ENTRY)).notEmpty().isEmail(),
  body('name', errMessage(INVALID_ENTRY)).exists(),
  body('password', errMessage(INVALID_ENTRY)).exists(),
];

const loginValidationRules = [
  body('email', errMessage(INVALID_LOGIN_DATA)).exists().isEmail(),
  body('password', errMessage(INVALID_LOGIN_DATA)).exists(),
];

const recipeValidationRules = [
  body('name', errMessage(INVALID_ENTRY)).exists(),
  body('ingredients', errMessage(INVALID_ENTRY)).exists(),
  body('preparation', errMessage(INVALID_ENTRY)).exists(),
];

const recipeIdValidationRules = [
  param('id', errMessage(RECIPE_NOT_FOUND)).isMongoId(),
];

const validate = (schemas, status) => async (req, res, next) => {
  await Promise.all(schemas.map((schema) => schema.run(req)));

  const result = validationResult(req);
  if (result.isEmpty()) {
    return next();
  }
  const errors = result.array();
  return res.status(status).send(errors[0].msg);
};

module.exports = {
  userValidate: validate(userValidationRules, 400),
  loginValidate: validate(loginValidationRules, 401),
  recipeValidate: validate(recipeValidationRules, 400),
  recipeIdValidate: validate(recipeIdValidationRules, 404),
};
