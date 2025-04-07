// controllers/widgetsController.js

const Widget = require('../models/widgetsModel');

const widgetsController = {
  // Criar widget
  create: async (req, res) => {
    const { campaign_id, name, source, duration, widget_order, start_date, end_date } = req.body;

    if (!campaign_id || !name || !source) {
      return res.status(400).json({ error: 'Campos obrigatórios: campaign_id, name, source' });
    }

    try {
      const newWidget = await Widget.create(campaign_id, name, source, duration, widget_order, start_date, end_date);
      res.status(201).json(newWidget);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao criar widget', details: err.message });
    }
  },

  // Listar todos os widgets de uma campanha
  getByCampaignId: async (req, res) => {
    const { campaign_id } = req.params;

    try {
      const widgets = await Widget.getByCampaignId(campaign_id);
      res.json(widgets);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao buscar widgets', details: err.message });
    }
  },

  // Deletar um widget
  delete: async (req, res) => {
    const { id } = req.params;

    try {
      const result = await Widget.delete(id);
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao deletar widget', details: err.message });
    }
  }
};

module.exports = widgetsController;
