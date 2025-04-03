const db = require('../db');

const Media = {
  // Função para criar um novo registro de mídia
  create: (campaign_id, file_path, file_type, duration) => {
    return new Promise((resolve, reject) => {
      db.run(`
        INSERT INTO media (campaign_id, file_path, file_type, duration) 
        VALUES (?, ?, ?, ?)
      `, [campaign_id, file_path, file_type, duration], function (err) {
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
  },

  // Função para atualizar um registro de mídia
  update: (id, file_path, file_type, duration) => {
    return new Promise((resolve, reject) => {
      db.run(`
        UPDATE media 
        SET file_path = ?, file_type = ?, duration = ? 
        WHERE id = ?
      `, [file_path, file_type, duration, id], function (err) {
        if (err) {
          reject(err);  // Caso ocorra erro, rejeita a Promise
        } else {
          resolve({
            id,
            file_path,
            file_type,
            duration
          });  // Resolve com os dados atualizados da mídia
        }
      });
    });
  },

  // Função para deletar um registro de mídia
  delete: (id) => {
    return new Promise((resolve, reject) => {
      db.run(`
        DELETE FROM media WHERE id = ?
      `, [id], function (err) {
        if (err) {
          reject(err);  // Caso ocorra erro, rejeita a Promise
        } else {
          resolve({ message: 'Media deleted successfully', id });  // Resolve com a mensagem de sucesso
        }
      });
    });
  },

  // Função para obter uma mídia pelo ID
  getById: (id) => {
    return new Promise((resolve, reject) => {
      db.get(`
      SELECT * FROM media WHERE id = ?
    `, [id], (err, row) => {
        if (err) {
          reject(err);  // Caso ocorra erro, rejeita a Promise
        } else {
          resolve(row);  // Resolve com os dados da mídia encontrada
        }
      });
    });
  },

  // NOVO MÉTODO: Atualizar apenas a duração
  updateDuration: (id, duration) => {
    return new Promise((resolve, reject) => {
      db.run(`
        UPDATE media 
        SET duration = ? 
        WHERE id = ?
      `, [duration, id], function (err) {
        if (err) {
          reject(err);
        } else {
          // Retorna todos os dados da mídia atualizada
          db.get(`SELECT * FROM media WHERE id = ?`, [id], (err, row) => {
            if (err) reject(err);
            else resolve(row);
          });
        }
      });
    });
  }

};

module.exports = Media;
