const Validator = require('validatorjs');

const validateRecipe = async (req, _res, next) => {
  try {
    const validate = new Validator(req.body, {
      name: 'required',
      ingredients: 'required',
      preparation: 'required',
    });
    // console.log(req.headers);
    validate.checkAsync(() => null, () => next('invalid_entries'));
    next();
  } catch (e) {
    console.log(e);
    next(e);
  }
};
module.exports = { validateRecipe };
