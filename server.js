const express = require('express');
const app = express();
const path = require('path');  // Importando o módulo path
const campaignRoutes = require('./routes/campaignRoutes');
const mediaRoutes = require('./routes/mediaRoutes');

// Middleware para parsear JSON (substituindo o body-parser)
app.use(express.json());

// Configuração para servir arquivos estáticos da pasta "uploads"
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rotas
app.use('/campaigns', campaignRoutes);
app.use('/media', mediaRoutes);

// Configurar a porta do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
