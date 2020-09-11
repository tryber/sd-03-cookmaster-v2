function errorMiddleware(error, _req, res, _next) {
  const { message, status } = error;
  res.status(status).send({ message });
}

module.exports = errorMiddleware;
