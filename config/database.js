const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./databasefile.db');

// Database setup
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username STRING NOT NULL UNIQUE,
      email STRING NOT NULL,
      password STRING NOT NULL
    )
  `);
});

// Handle database errors
db.on('error', (err) => {
  console.error('Database error:', err);
});

// Close database on process exit
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err);
    }
    process.exit(0);
  });
});

module.exports = db;