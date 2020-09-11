const express = require('express');
const bodyParser = require('body-parser');
const usersRouter = require('./users/usersController');
const loginRouter = require('./login/loginController');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(bodyParser.json());

app.use((request, _, next) => {
  console.log(`${request.method} ${request.path}`);
  next();
});

app.get('/', (_request, response) => {
  response.send();
});

app.use('/users', usersRouter);

app.use('/login', loginRouter);

app.use(errorHandler);

app.listen(3000, () => {
  console.log('Ouvindo a porta 3000!');
});
