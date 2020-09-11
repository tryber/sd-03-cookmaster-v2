module.exports = (err, _req, res, _next) => {
  if (err.statusCode) {
    return res.status(err.statusCode).json({
      code: err.code,
      message: err.message,
      stack: err.stack,
    });
  }
  return res.status(500).json({
    err: {
      error: err.message,
      message: 'Internal Error',
      stack: err.stack,
    },
  });
};
