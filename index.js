const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const userController = require('./controllers/userController');

const app = express();

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/users', userController.newUser);

app.post('/login', userController.login);

app.post(
  '/users/admin',
  userController.newAdmin,
);

app.all('*', (error, _req, res, _next) => res.json(error).status(500));


// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(3000, () => console.log('Listening on 3000'));
