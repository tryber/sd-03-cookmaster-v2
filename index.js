const path = require('path');
// const multer = require('multer');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const middlewares = require('./middlewares/index');
const UserRouter = require('./routes/users');
const RecipeRouter = require('./routes/recipes');
const userController = require('./users/userController');
require('dotenv').config();

const MONGO_DB_URL = process.env.MONGO_DB_URL || 'mongodb://mongodb:27017/Cookmaster';

mongoose.connect(MONGO_DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'uploads')));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
app.use('/users', UserRouter);
app.use('/recipes', RecipeRouter);

app.post('/login', middlewares.validateLogin, userController.login);

app.use(middlewares.errorHandler);

const { PORT = 3000 } = process.env;

app.listen(PORT);
console.log(`conectado na porta ${PORT}`);

// app.use((req, res, next) => {
//   console.log(`==================== requestito ====================
//   ${req.method} ${req.path}`);
//   console.log(`${JSON.stringify(req.body)}
//   ==================== requestito ====================`);

//   next();
// });
