const validationMessage = { default: 'Invalid entries. Try again.' };

function ValidateRecipeData(name, ingredients, preparation) {
  switch (true) {
    case !name || !ingredients || !preparation:
      return validationMessage.default;
    default:
      return null;
  }
}

module.exports = (name, ingredients, preparation) => {
  const recipeValidation = ValidateRecipeData(name, ingredients, preparation);
  return { message: recipeValidation };
};
