function errorMiddleware(error, req, res, next) {
  const { message, status } = error;
  console.log(message, status);
  res.status(status).send({ message });
}

module.exports = errorMiddleware;
