const errMessage = (message) => ({ message });

module.exports = {
  INVALID_ENTRIES_TRY_AGAIN: 'Invalid entries. Try again.',
  EMAIL_ALREADY_REGISTERED: 'Email already registered',
  INCORRECT_USERNAME_OR_PASSWORD: 'Incorrect username or password',
  ALL_FILDS_MUST_BE_FILLED: 'All fields must be filled',
  RECIPE_NO_FOUND: 'recipe not found',
  errMessage,
};
