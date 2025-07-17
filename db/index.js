const Database = require("better-sqlite3");
const db = new Database("mydb.sqlite", { verbose: console.log });

//    DB Structure
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     discord_id INTEGER,
//     pubg_id TEXT,
//     pubg_rank TEXT
//     platform TEXT

db.prepare(
  `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    discord_id INTEGER, 
    pubg_id TEXT,
    pubg_rank TEXT,
    platform TEXT
    )`
).run();

module.exports ={
    db
}
