const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  user: "root",
  host: "127.0.0.1",
  password: "root",
  database: "user-database",
})

// Ensures the server is loaded.
app.listen(3306, () => {
  console.log("running");
  db.connect((err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("loaded");
    }
  })
})
