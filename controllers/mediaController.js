const Media = require('../models/mediaModel');
const Campaign = require('../models/campaignModel');
const path = require('path');
const fs = require('fs');

const mediaController = {
  create: async (req, res) => {
    const {
      campaign_id,
      file_type,
      duration,
      media_order,
      start_date,
      end_date
    } = req.body;
    const file = req.file;

    if (!campaign_id || !file_type || !file) {
      return res.status(400).json({ error: 'Campaign ID, file_type, and file are required' });
    }

    try {
      const campaign = await Campaign.getById(campaign_id);
      if (!campaign) {
        return res.status(404).json({ error: 'Campaign not found' });
      }

      const fileExtension = path.extname(file.originalname);
      const filePath = path.join('uploads', Date.now() + fileExtension);

      fs.rename(file.path, filePath, async (err) => {
        if (err) {
          return res.status(500).json({ error: 'Erro ao mover o arquivo para o diretório final' });
        }

        try {
          const media = await Media.create(
            campaign_id,
            filePath,
            file_type,
            duration,
            media_order,
            start_date,
            end_date
          );
          res.status(201).json(media);
        } catch (err) {
          res.status(500).json({ error: err.message });
        }
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getByCampaignId: async (req, res) => {
    const { campaign_id } = req.params;
    try {
      const media = await Media.getByCampaignId(campaign_id);
      res.status(200).json(media);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  update: async (req, res) => {
    const { id } = req.params;
    const {
      duration,
      media_order,
      start_date,
      end_date
    } = req.body;

    try {
      const media = await Media.getById(id);
      if (!media) {
        return res.status(404).json({ error: 'Media not found' });
      }

      const updatedMedia = await Media.update(id, {
        duration,
        media_order,
        start_date,
        end_date
      });

      res.status(200).json(updatedMedia);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  delete: async (req, res) => {
    const { id } = req.params;

    try {
      const media = await Media.getById(id);
      if (!media) {
        return res.status(404).json({ error: 'Media not found' });
      }

      const result = await Media.delete(id);

      setTimeout(() => {
        fs.unlink(media.file_path, (err) => {
          if (err) {
            console.error('Erro ao excluir o arquivo do sistema:', err.message);
          } else {
            console.log(`Arquivo ${media.file_path} excluído com sucesso.`);
          }
        });
      }, 30000); // 30 segundos

      return res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

module.exports = mediaController;
