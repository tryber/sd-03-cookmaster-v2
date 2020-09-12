const userServices = require('./userServices');
const recipesServices = require('./recipesServices');

const { create: CreateUser, getUser: SearchUser } = userServices;

const {
  create: CreateRecipe,
  update: UpdateRecipe,
  uploadImageData: UploadImage,
  listRecipes: ListAll,
  listRecipe: GetRecipe,
  deleteRecipeById: DeleteRecipe,
} = recipesServices;

module.exports = {
  CreateUser,
  SearchUser,
  CreateRecipe,
  UpdateRecipe,
  UploadImage,
  ListAll,
  GetRecipe,
  DeleteRecipe,
};
