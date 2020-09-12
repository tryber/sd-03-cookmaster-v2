const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const controllers = require('./controllers');
const auth = require('./services/auth');
const userController = require('./controllers/userController');

const app = express();

app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'uploads')));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${req.params.id}.jpeg`);
  },
});

const upload = multer({ storage });

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/users/admin', auth, userController.addAdmin);
app.post('/users', controllers.userController.addUser);
app.post('/login', controllers.userController.loginUser);

app.get('/recipes', controllers.recipeController.listRecipes);
app.post('/recipes', auth, controllers.recipeController.addRecipe);

app.put('/recipes/:id/image', auth, upload.single('image'), controllers.recipeController.updateRcpImg);
app.get('/recipes/:id', controllers.recipeController.listById);
app.put('/recipes/:id', auth, controllers.recipeController.update);
app.delete('/recipes/:id', auth, controllers.recipeController.removeRecipe);

app.listen(3000, () => console.log('Listening on 3000'));
