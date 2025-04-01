// models/campaignModel.js

const db = require('../db');

const Campaign = {
  create: (name, description) => {
    return new Promise((resolve, reject) => {
      db.run(`
        INSERT INTO campaigns (name, description) VALUES (?, ?)
      `, [name, description], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, name, description });
        }
      });
    });
  },

  getById: (id) => {
    return new Promise((resolve, reject) => {
      db.get(`
        SELECT * FROM campaigns WHERE id = ?
      `, [id], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  },
  
  getAll: () => {
    return new Promise((resolve, reject) => {
      db.all(`
        SELECT * FROM campaigns
      `, [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }
};

module.exports = Campaign;
