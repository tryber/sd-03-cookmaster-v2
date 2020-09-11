const express = require('express');
const bodyParser = require('body-parser');
const { loginController, userController } = require('./controllers');

const app = express();
app.use(bodyParser({ extended: true }));
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/login', loginController);

app.use('/users', userController);

app.listen(3000, () => console.log('iniciando Servidor !'));
