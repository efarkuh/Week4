import Database from "better-sqlite3";
const db = new Database("database.db");

db.exec(`
    CREATE TABLE IF NOT EXISTS messageTable (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstName TEXT,
        message TEXT
    )
`);

db.exec( `
    INSERT INTO messageTable (firstName, message)
    VALUES
    ('James','The best website ever'),
    ('Mary','Very good'),
    ('John','I liked the desing')
`);