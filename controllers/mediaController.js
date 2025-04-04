const Media = require('../models/mediaModel');
const Campaign = require('../models/campaignModel'); // Importar o model de campanhas
const path = require('path');

const mediaController = {
  create: async (req, res) => {
    const { campaign_id, file_type, duration } = req.body;
    const file = req.file; // O arquivo foi processado pelo Multer e está disponível aqui

    if (!campaign_id || !file_type || !file) {
      return res.status(400).json({ error: 'Campaign ID, file_type, and file are required' });
    }

    // Verificar se a campanha existe
    try {
      const campaign = await Campaign.getById(campaign_id);
      if (!campaign) {
        return res.status(404).json({ error: 'Campaign not found' });
      }

      // Gerar o caminho completo onde o arquivo foi salvo
      const fileExtension = path.extname(file.originalname);  // Pega a extensão do arquivo original
      const filePath = path.join('uploads', Date.now() + fileExtension); // Usa a extensão original

      // Mover o arquivo para o caminho correto
      const fs = require('fs');
      fs.rename(file.path, filePath, (err) => {
        if (err) {
          return res.status(500).json({ error: 'Erro ao mover o arquivo para o diretório final' });
        }

        // Criar o registro de mídia no banco de dados, com o caminho do arquivo
        Media.create(campaign_id, filePath, file_type, duration)
          .then((media) => res.status(201).json(media)) // Retorna a mídia criada
          .catch((err) => res.status(500).json({ error: err.message }));
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
    const { duration } = req.body;

    if (!duration) {
      return res.status(400).json({ error: 'Duration is required' });
    }

    try {
      const media = await Media.getById(id);
      if (!media) {
        return res.status(404).json({ error: 'Media not found' });
      }

      // Atualizar apenas a duração no banco de dados
      const updatedMedia = await Media.updateDuration(id, duration);
      res.status(200).json(updatedMedia);

    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  delete: async (req, res) => {
    const { id } = req.params;

    try {
      const media = await Media.getById(id); // Verificar se a mídia existe
      if (!media) {
        return res.status(404).json({ error: 'Media not found' });
      }
    
      // Deletar o registro de mídia no banco de dados
      const result = await Media.delete(id);
    
      // Espera 1 minuto para deletar o arquivo do sistema de arquivos
      const fs = require('fs');
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
