// db.js
const mysql = require("mysql2/promise");

async function getConnection() {
  return await mysql.createConnection({
    host: "127.0.0.1",
    user: "web",
    password: "web123456",
    database: "web-dbase",
  });
}

module.exports = { getConnection };
