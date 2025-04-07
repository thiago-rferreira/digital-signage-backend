// controllers/campaignController.js

const Campaign = require('../models/campaignModel');

const campaignController = {
  create: async (req, res) => {
    const { name, description, type } = req.body;
    console.log('Received data:', name, description, type);

    if (!name || !description) {
      return res.status(400).json({ error: 'Name and description are required' });
    }

    const validTypes = ['fullscreen', 'portrait', 'split'];
    if (type && !validTypes.includes(type)) {
      return res.status(400).json({ error: 'Invalid campaign type' });
    }

    try {
      const campaign = await Campaign.create(name, description, type);
      res.status(201).json(campaign);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getAll: async (req, res) => {
    try {
      const campaigns = await Campaign.getAll();
      res.status(200).json(campaigns);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  update: async (req, res) => {
    const { id } = req.params;
    const { name, description, type } = req.body;

    if (!name || !description) {
      return res.status(400).json({ error: 'Name and description are required' });
    }

    const validTypes = ['fullscreen', 'portrait', 'split'];
    if (type && !validTypes.includes(type)) {
      return res.status(400).json({ error: 'Invalid campaign type' });
    }

    try {
      const updatedCampaign = await Campaign.update(id, name, description, type);
      res.status(200).json(updatedCampaign);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  delete: async (req, res) => {
    const { id } = req.params;
    try {
      const result = await Campaign.delete(id);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

module.exports = campaignController;
