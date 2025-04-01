// controllers/campaignController.js

const Campaign = require('../models/campaignModel');

const campaignController = {
  create: async (req, res) => {
    const { name, description } = req.body;
    console.log('Received data:', name, description);
   
    if (!name || !description) {
      return res.status(400).json({ error: 'Name and description are required' });
    }
    try {
      const campaign = await Campaign.create(name, description);
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
  }
};

module.exports = campaignController;
