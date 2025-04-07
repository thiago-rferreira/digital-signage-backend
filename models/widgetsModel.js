// models/widgetsModel.js
const db = require('../db');
const { get } = require('../routes/widgetsRoutes');
const { getById, update } = require('./campaignModel');

const Widget = {
  create: (campaign_id, name, source, duration, widget_order = null, start_date = null, end_date = null) => {
    return new Promise((resolve, reject) => {
      db.run(`
        INSERT INTO widgets (campaign_id, name, source, duration, widget_order, start_date, end_date)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `, [campaign_id, name, source, duration, widget_order, start_date, end_date], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({
            id: this.lastID,
            campaign_id,
            name,
            source,
            duration,
            widget_order,
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
        SELECT * FROM widgets
        WHERE campaign_id = ?
        ORDER BY widget_order ASC
      `, [campaign_id], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  },

  delete: (id) => {
    return new Promise((resolve, reject) => {
      db.run(`
        DELETE FROM widgets WHERE id = ?
      `, [id], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ message: 'Widget deletado com sucesso', id });
        }
      });
    });
  },

  getById: (id) => {
    return new Promise((resolve, reject) => {
      db.get(`
        SELECT * FROM widgets WHERE id = ?
      `, [id], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  },

  update: (id, duration, widget_order, start_date, end_date) => {

    return new Promise((resolve, reject) => {
      db.run(`
        UPDATE widgets
        SET duration = ?, widget_order = ?, start_date = ?, end_date = ?
        WHERE id = ?
      `, [duration, widget_order, start_date, end_date, id], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({
            id,
            duration,
            widget_order,
            start_date,
            end_date
          });
        }
      });
    });
  }
};

module.exports = Widget;
