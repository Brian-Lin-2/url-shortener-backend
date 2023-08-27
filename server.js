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

app.post('/register', (req, res) => {
  const sql = "INSERT INTO `user-database`.`login` (`email`, `password`) VALUES (?, ?)";

  // req is in array format from user form.
  const data = {
    name: req.body[0],
    email: req.body[1],
    password: req.body[2],
  }

  db.query(sql, [data], (error, result) => {
    if (result) {
      res.send(result);
    } else {
      res.send({ message: "Email Is Taken" });
    }
  });
})

app.post('/login', (req, res) => {
  const sql = "SELECT * FROM `user-database`.`login` WHERE `email` = ? AND `password` = ?";

  // req is in array format from user form.
  const data = {
    email: req.body[0],
    password: req.body[1],
  }

  db.query(sql, [data], (error, result) => {
    if (result.length > 0) {
      res.send(result);
    } else {
      res.send({ message: "Invalid Email/Password" });
    }
  });
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
