const { body, validationResult, param } = require('express-validator');
const {
  INVALID_ENTRIES_TRY_AGAIN,
  errMessage,
  ALL_FILDS_MUST_BE_FILLED,
  RECIPE_NO_FOUND,
} = require('./errosMessage');

const validate = (schema, status) => async (req, res, next) => {
  await Promise.all(schema.map((schema) => schema.run(req)));

  const result = validationResult(req);
  if (result.isEmpty()) {
    return next();
  }
  const err = result.array();
  return res.status(status).send(err[0].msg);
};

const dataValidationRules = [
  body('email', errMessage(INVALID_ENTRIES_TRY_AGAIN)).notEmpty().isEmail(),
  body('name', errMessage(INVALID_ENTRIES_TRY_AGAIN)).exists(),
  body('password', errMessage(INVALID_ENTRIES_TRY_AGAIN)).exists(),
];

const loginValidationRules = [
  body('email', errMessage(ALL_FILDS_MUST_BE_FILLED)).exists().isEmail(),
  body('password', errMessage(ALL_FILDS_MUST_BE_FILLED)).exists(),
];

const recipeValidationRules = [
  body('name', errMessage(INVALID_ENTRIES_TRY_AGAIN)).exists(),
  body('ingredients', errMessage(INVALID_ENTRIES_TRY_AGAIN)).exists(),
  body('preparation', errMessage(INVALID_ENTRIES_TRY_AGAIN)).exists(),
];

const recipeIdValidationRules = [param('id', errMessage(RECIPE_NO_FOUND)).isMongoId()];

module.exports = {
  userValidate: validate(dataValidationRules, 400),
  loginValidate: validate(loginValidationRules, 401),
  recipeValidation: validate(recipeValidationRules, 400),
  recipeIdValidation: validate(recipeIdValidationRules, 404),
};
