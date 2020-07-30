const express = require('express');

const app = express();

app.get('/', function (req, res) {
    res.send('Olá, moderador!');
});

app.listen(3000, function () {
    console.log('Aplicação iniciada na porta 3000.');
});