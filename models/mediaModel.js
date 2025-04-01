const db = require('../db');

const Media = {
  // Função para criar um novo registro de mídia
  create: (campaign_id, file_path, file_type, duration) => {
    return new Promise((resolve, reject) => {
      db.run(`
        INSERT INTO media (campaign_id, file_path, file_type, duration) 
        VALUES (?, ?, ?, ?)
      `, [campaign_id, file_path, file_type, duration], function(err) {
        if (err) {
          reject(err);  // Caso ocorra erro, rejeita a Promise
        } else {
          resolve({
            id: this.lastID, 
            campaign_id, 
            file_path, 
            file_type, 
            duration
          });  // Resolve com os dados da mídia recém-criada
        }
      });
    });
  },

  // Função para obter mídias associadas a uma campanha
  getByCampaignId: (campaign_id) => {
    return new Promise((resolve, reject) => {
      db.all(`
        SELECT * FROM media WHERE campaign_id = ?
      `, [campaign_id], (err, rows) => {
        if (err) {
          reject(err);  // Caso ocorra erro, rejeita a Promise
        } else {
          resolve(rows);  // Resolve com os registros de mídia encontrados
        }
      });
    });
  }
};

module.exports = Media;
