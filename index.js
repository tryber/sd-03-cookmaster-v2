const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const { userController, recipesController } = require('./controllers');
const { userValidate, loginValidate, recipeValidate, recipeIdValidate } = require('./middlewares/validateData');
const authMiddleware = require('./middlewares/authentication');

const storage = multer.diskStorage({
  destination: path.join(__dirname, 'uploads'),
  filename: (req, _file, callback) => {
    callback(null, req.params.id);
  },
});
const upload = multer({ storage });

const app = express();
app.use(bodyParser.json());

app.post('/users/admin', authMiddleware, userController.registerAdmin);
app.post('/users', userValidate, userController.registerUser);
app.post('/login', loginValidate, userController.loginUser);
app.post('/recipes', authMiddleware, recipeValidate, recipesController.registerRecipes);

app.get('/recipes/:id', recipeIdValidate, recipesController.recipeById);
app.get('/recipes', recipesController.listRecipes);

app.put('/recipes/:id/image',
  authMiddleware,
  recipeIdValidate,
  upload.single('image'),
  recipesController.updateRecipeImageById);
app.put('/recipes/:id', authMiddleware, recipeIdValidate, recipesController.updateRecipeById);

app.delete('/recipes/:id', authMiddleware, recipeIdValidate, recipesController.deleteRecipeById);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(3000, () => console.log('App listening on port 3000!'));
