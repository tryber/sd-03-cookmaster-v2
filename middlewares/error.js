function errorMiddleware(error, req, res, next) {
  const { message, status } = error;
  res.status(status).send({ message });
}

module.exports = errorMiddleware;
