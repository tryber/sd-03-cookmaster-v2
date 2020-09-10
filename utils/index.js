const generateError = (status = 404, error) => ({
  status,
  payload: { err: { message: error.message } },
});

module.exports = { generateError };
