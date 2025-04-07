const express = require('express');
const router = express.Router();
const widgetsController = require('../controllers/widgetsController');

// Criar widget
router.post('/', widgetsController.create);

// Listar widgets por campanha
router.get('/:campaign_id', widgetsController.getByCampaignId);

// Deletar widget
router.delete('/:id', widgetsController.delete);

// Atualizar widget
router.put('/:id', widgetsController.update);

module.exports = router;
