const { Router } = require('express');

// Listar receitas
Router.get('/');

// Listar uma receita específica
Router.get('/:id');

// Editar uma receita
Router.put('/:id');

// Adicionar uma imagem
Router.put('/:id/image');

// Criar uma receita
Router.post('/');

// Excluir uma receita
Router.delete('/:id');
