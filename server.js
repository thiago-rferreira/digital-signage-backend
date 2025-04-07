const express = require('express');
const app = express();
const path = require('path');  // Importando o módulo path
const campaignRoutes = require('./routes/campaignRoutes');
const mediaRoutes = require('./routes/mediaRoutes');
const widgetsRoutes = require('./routes/widgetsRoutes');

const cors = require('cors');


app.use(cors());


// Middleware para parsear JSON (substituindo o body-parser)
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.mp4')) {
      res.setHeader('Content-Type', 'video/mp4');
    }
  }
}));


// Rotas
app.use('/campaigns', campaignRoutes);
app.use('/media', mediaRoutes);
app.use('/widgets', widgetsRoutes);


// Configurar a porta do servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
