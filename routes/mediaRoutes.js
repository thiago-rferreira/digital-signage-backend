const express = require('express');
const router = express.Router();
const mediaController = require('../controllers/mediaController');
const multer = require('multer');

// Configuração do Multer
const upload = multer({ dest: 'uploads/' });  // Diretório para armazenar temporariamente os arquivos

// Rota para criar uma mídia (upload de arquivo)
router.post('/', upload.single('file'), mediaController.create);

// Rota para obter as mídias de uma campanha
router.get('/:campaign_id', mediaController.getByCampaignId);

// Rota para deletar uma mídia
router.delete('/:id', mediaController.delete);

// Rota para atualizar uma mídia (apenas duração)
router.put('/:id', mediaController.update);

module.exports = router;
