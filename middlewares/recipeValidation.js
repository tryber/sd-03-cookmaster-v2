const boom = require('@hapi/boom');

module.exports = (req, _res, next) => {
  const { name, ingredients, preparation } = req.body;

  if (!name || !ingredients || !preparation) {
    return next(boom.badRequest('Invalid entries. Try again.'));
  }

  req.recipe = { name, ingredients, preparation };
  next();
};
