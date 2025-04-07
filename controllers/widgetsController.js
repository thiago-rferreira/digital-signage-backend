const Widget = require('../models/widgetsModel');
const Campaign = require('../models/campaignModel');

const widgetsController = {
  // Criar um novo widget
  create: async (req, res) => {
    const {
      campaign_id,
      name,
      source,
      duration,
      widget_order,
      start_date,
      end_date
    } = req.body;
    
    
    if (!campaign_id || !name || !source) {
      return res.status(400).json({ error: 'Campaign ID, name e source são obrigatórios' });
    }

    try {
      const campaign = await Campaign.getById(campaign_id);
      if (!campaign) {
        return res.status(404).json({ error: 'Campanha não encontrada' });
      }

      const widget = await Widget.create(
        campaign_id,
        name,
        source,
        duration,
        widget_order,
        start_date,
        end_date
      );

      res.status(201).json(widget);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Buscar widgets por campanha
  getByCampaignId: async (req, res) => {
    const { campaign_id } = req.params;
    try {
      const widgets = await Widget.getByCampaignId(campaign_id);
      res.status(200).json(widgets);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Deletar um widget
  delete: async (req, res) => {
    const { id } = req.params;

    try {
      const widget = await Widget.getById(id);
      if (!widget) {
        return res.status(404).json({ error: 'Widget não encontrado' });
      }

      const result = await Widget.delete(id);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

module.exports = widgetsController;
