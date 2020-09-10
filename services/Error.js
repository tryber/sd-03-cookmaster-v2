class Error {
  constructor() {
    this.message = undefined;
    this.notSign = { status: 401, message: this.message || 'Incorrect username or password' };
  }
}

module.exports = Error;
