const makeError = require('../helpers/makeError');

module.exports = (err, _req, res, _next) => {
  console.log('erre', err);
  const error = makeError(err);
  // ternário top do Herbert https://github.com/tryber/sd-03-store-manager/pull/4/files
  return error
    ? res.status(error.status).json(error.payload)
    : res.status(500).json({ message: 'Internal error' });
};
