const express = require('express');
const bodyParser = require('body-parser');
const users = require('./controllers/userController');
const userLogin = require('./controllers/loginController');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/users', users);
app.post('/login', userLogin);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Escutando na porta ${PORT}`);
});
