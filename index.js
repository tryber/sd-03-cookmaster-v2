const express = require('express');
const {loginController} = require('./controllers')

const app = express();

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.get('/users', (req, res) => {
  res.send('enviado com sucesso');
});

app.use('/login', loginController)
app.listen(3000, () => console.log('iniciando Servidor !'));
