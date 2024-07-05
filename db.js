const http = require("http");
const mysql = require("mysql");
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Admin125!@%",
  database: "TODO_App",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
  } else {
    console.log("Data Base Connected");
  }
});

module.exports = db;
