const multer = require('multer');
const path = require('path');

// Função para verificar tipo de arquivo
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'video/mp4', 'video/avi', 'video/mkv'];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Tipo de arquivo inválido. Aceito apenas imagens e vídeos.'), false);
  }
};

// Configuração do Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');  // Pasta onde os arquivos serão salvos
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));  // Nome único para o arquivo
  }
});

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

module.exports = upload;
