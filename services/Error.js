class Error {
  constructor() {
    this.message = undefined;
    this.notSign = { status: 401, message: this.message || 'Incorrect username or password' };
    this.invalidToken = { status: 401, message: this.message || 'jwt malformed' };
    this.invalidEntries = { status: 400, message: this.message || 'Invalid entries. Try again.' };
    this.recipeNotFound = { status: 404, message: this.message || 'recipe not found' };
    this.noauth = { status: 401, message: this.message || 'missing auth token' };
    this.noAdmin = { status: 403, message: this.message || 'Only admins can register new admins' };
  }
}

module.exports = Error;
