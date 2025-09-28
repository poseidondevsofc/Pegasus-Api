const express = require('express');
const path = require('path');
const apiChat = require('./api-chat');

const app = express();
app.use(express.json());

// rota da API
app.post('/api/chat', apiChat);

// servir chat.html estático
app.use(express.static(__dirname));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Pegasus Chat rodando em http://localhost:${PORT}`));
