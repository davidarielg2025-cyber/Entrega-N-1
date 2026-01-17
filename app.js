const express = require('express');
const app = express();
const PORT = 8080;

app.get('/', (req, res) => {
    res.send('Servidor de Entrega N1 - Backend');
});

app.listen(PORT, () => {
    console.log('Servidor corriendo en puerto ' + PORT);
});