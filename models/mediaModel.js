// models/mediaModel.js

const db = require('../db');

const Media = {
  create: (campaign_id, file_path, file_type, duration, media_order = null, start_date = null, end_date = null) => {
    return new Promise((resolve, reject) => {
      db.run(`
        INSERT INTO media (campaign_id, file_path, file_type, duration, media_order, start_date, end_date)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `, [campaign_id, file_path, file_type, duration, media_order, start_date, end_date], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({
            id: this.lastID,
            campaign_id,
            file_path,
            file_type,
            duration,
            media_order,
            start_date,
            end_date
          });
        }
      });
    });
  },

  getByCampaignId: (campaign_id) => {
    return new Promise((resolve, reject) => {
      db.all(`
        SELECT * FROM media WHERE campaign_id = ? ORDER BY media_order ASC
      `, [campaign_id], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  },

  getById: (id) => {
    return new Promise((resolve, reject) => {
      db.get(`SELECT * FROM media WHERE id = ?`, [id], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  },

  update: (id, { duration, media_order, start_date, end_date }) => {
    return new Promise((resolve, reject) => {
      db.run(`
        UPDATE media
        SET duration = ?, media_order = ?, start_date = ?, end_date = ?
        WHERE id = ?
      `, [duration, media_order, start_date, end_date, id], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({
            id,
            duration,
            media_order,
            start_date,
            end_date
          });
        }
      });
    });
  },

  delete: (id) => {
    return new Promise((resolve, reject) => {
      db.run(`DELETE FROM media WHERE id = ?`, [id], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ message: 'Media deleted successfully', id });
        }
      });
    });
  }
};

module.exports = Media;
