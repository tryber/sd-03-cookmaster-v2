class ErrorClass extends Error {
  constructor(statusCode, message, code) {
    super();
    this.statusCode = statusCode;
    this.message = message;
    this.code = code;
  }
}

module.exports = {
  ErrorClass,
};
