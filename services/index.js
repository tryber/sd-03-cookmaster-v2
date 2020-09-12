const userServices = require('./userServices');
const recipesServices = require('./recipesServices');

const { create: CreateUser, createAdmin: CreateAdmin, getUser: SearchUser } = userServices;

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
  CreateAdmin,
  SearchUser,
  CreateRecipe,
  UpdateRecipe,
  UploadImage,
  ListAll,
  GetRecipe,
  DeleteRecipe,
};
