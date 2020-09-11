const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer');

const authenticate = require('./middlewares/authentication');

const { showAllUsers,
  createUser,
  userLogin,
  createRecipe,
  getAllRecipes,
  getRecipe,
  updateRecipe,
  deleteRecipe,
  uploadImage,
  createAdmin } = require('./contollers/controller');

const app = express();

app.use(bodyParser.json());

const storage = multer.diskStorage({
  destination: 'uploads',
  filename: (req, file, callback) => { callback(null, `${req.params.id}.${file.mimetype.slice(file.mimetype.indexOf('/') + 1)}`); },
});

const upload = multer({ storage });

app.get('/users', showAllUsers);
app.post('/users', createUser);
app.post('/login', userLogin);
app.post('/recipes', authenticate, createRecipe);
app.get('/recipes', getAllRecipes);
app.get('/recipes/:id', getRecipe);
app.put('/recipes/:id', authenticate, updateRecipe);
app.delete('/recipes/:id', authenticate, deleteRecipe);
app.put('/recipes/:id/image', authenticate, upload.single('image'), uploadImage);
app.use('/images', express.static(path.join(__dirname, 'uploads'), { extensions: ['png'] }));
app.post('/users/admin', authenticate, createAdmin);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(3000, () => console.log('Conectado na porta 3000'));
