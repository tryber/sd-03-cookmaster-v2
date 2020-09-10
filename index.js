const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
const controllers = require('./controllers');


// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/users', controllers.userController.createUser);

const { PORT = 3000 } = process.env;
app.listen(PORT, () => { console.log(`Escutando na porta ${PORT}`); });
