const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const Controllers = require('./controllers');
const Middlewares = require('./middlewares');
const storage = require('./config/multer');

mongoose.connect('mongodb://localhost:27017/Cookmaster', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const upload = multer({ storage });
const app = express();
app.use(bodyParser.json());
app.use(express.static('images'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
app.post('/users', Middlewares.validade.user, Controllers.users.createUser);
app.post(
  '/users/admin',
  Middlewares.validade.user,
  Middlewares.validade.validateToken,
  Middlewares.validade.validateAdmin,
  Controllers.users.createAdmin,
);
app.post('/login', Middlewares.validade.login, Controllers.users.loginUser);
app.post(
  '/recipes',
  Middlewares.validade.recipes,
  Middlewares.validade.validateToken,
  Controllers.recipes.createRecipes,
);

app.put(
  '/recipes/:id',
  Middlewares.validade.recipes,
  Middlewares.validade.validateToken,
  Controllers.recipes.updateRecipe,
);
app.delete('/recipes/:id', Middlewares.validade.validateToken, Controllers.recipes.deleteRecipe);
app.put(
  '/recipes/:id/image',
  Middlewares.validade.validateToken,
  upload.single('image'),
  Controllers.recipes.uploadImage,
);

app.get('/recipes', Controllers.recipes.listRecipes);
app.get('/recipes/:id', Controllers.recipes.getRecipe);

app.use(Middlewares.error);

app.listen(3000, () => console.log('listen to port 3000'));
