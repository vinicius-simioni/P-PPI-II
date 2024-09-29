const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require('body-parser');
const listEndpoints = require('express-list-endpoints')

app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3000;

// Configuração do middleware body-parser
app.use(bodyParser.json());

// Routes
const routes = require("./routes/router");
app.use("/api", routes);

// Configuração para servir arquivos estáticos, como imagens
app.use('/api/images', express.static(__dirname + '/uploads'));

// Lista todas as rotas
console.log(listEndpoints(app));

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});