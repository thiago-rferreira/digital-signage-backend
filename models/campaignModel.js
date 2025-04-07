// models/campaignModel.js

const db = require('../db');

const Campaign = {
  create: (name, description, type) => {
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO campaigns (name, description, type) VALUES (?, ?, ?)`,
        [name, description, type],
        function (err) {
          if (err) {
            reject(err);
          } else {
            resolve({ id: this.lastID, name, description, type });
          }
        }
      );
    });
  },

  getById: (id) => {
    return new Promise((resolve, reject) => {
      db.get(
        `SELECT * FROM campaigns WHERE id = ?`,
        [id],
        (err, row) => {
          if (err) {
            reject(err);
          } else {
            resolve(row);
          }
        }
      );
    });
  },

  getAll: () => {
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT * FROM campaigns`,
        [],
        (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        }
      );
    });
  },

  update: (id, name, description, type) => {
    return new Promise((resolve, reject) => {
      db.run(
        `UPDATE campaigns SET name = ?, description = ?, type = ? WHERE id = ?`,
        [name, description, type, id],
        function (err) {
          if (err) {
            reject(err);
          } else {
            resolve({ id, name, description, type });
          }
        }
      );
    });
  },

  delete: (id) => {
    return new Promise((resolve, reject) => {
      db.run(
        `DELETE FROM campaigns WHERE id = ?`,
        [id],
        function (err) {
          if (err) {
            reject(err);
          } else {
            resolve({ message: 'Campaign deleted successfully', id });
          }
        }
      );
    });
  }
};

module.exports = Campaign;
