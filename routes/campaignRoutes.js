// routes/campaignRoutes.js

const express = require('express');
const router = express.Router();
const campaignController = require('../controllers/campaignController');

// Rota para criar campanha
router.post('/', campaignController.create);

// Rota para listar todas as campanhas
router.get('/', campaignController.getAll);

module.exports = router;
