let sql = require("mysql");

let connection = sql.createConnection({
  host: "localhost",
  user: "admin",
  password: "qwerty123",
  database: "kreditin",
});

connection.connect(console.log("db connected"));

module.exports = connection;
