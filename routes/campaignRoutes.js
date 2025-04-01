// routes/campaignRoutes.js

const express = require('express');
const router = express.Router();
const campaignController = require('../controllers/campaignController');

// Rota para criar campanha
router.post('/', campaignController.create);

// Rota para listar todas as campanhas
router.get('/', campaignController.getAll);

// Rota para atualizar uma campanha
router.put('/:id', campaignController.update);

// Rota para deletar uma campanha
router.delete('/:id', campaignController.delete);

module.exports = router;
