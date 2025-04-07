const sqlite3 = require('sqlite3').verbose();

// Criação ou abertura do banco de dados SQLite
const db = new sqlite3.Database('./media.db', (err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err.message);
  } else {
    console.log("Conectado ao banco de dados SQLite.");
  }
});

// Criação da tabela de campanhas
db.run(`
  CREATE TABLE IF NOT EXISTS campaigns (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    type TEXT CHECK (type IN ('fullscreen', 'portrait', 'split')) DEFAULT 'fullscreen',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`, (err) => {
  if (err) {
    console.error("Erro ao criar a tabela de campanhas:", err.message);
  }
});

// Criação da tabela de mídias, associada à campanha
db.run(`
  CREATE TABLE IF NOT EXISTS media (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    campaign_id INTEGER NOT NULL,
    file_path TEXT NOT NULL,
    file_type TEXT CHECK (file_type IN ('image', 'video')) NOT NULL,
    duration INTEGER DEFAULT 10,
    media_order INTEGER DEFAULT 0,
    start_date TEXT,
    end_date TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (campaign_id) REFERENCES campaigns(id) ON DELETE CASCADE
  )
`, (err) => {
  if (err) {
    console.error("Erro ao criar a tabela de mídias:", err.message);
  }
});

db.run(`
  CREATE TABLE IF NOT EXISTS widgets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    campaign_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    source TEXT NOT NULL, -- pode ser uma URL ou um caminho local
    duration INTEGER DEFAULT 30, -- tempo em segundos na tela
    widget_order INTEGER DEFAULT 0,
    start_date TEXT,
    end_date TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (campaign_id) REFERENCES campaigns(id) ON DELETE CASCADE
  )
`, (err) => {
  if (err) console.error("Erro ao criar a tabela widgets:", err.message);
});


module.exports = db;
