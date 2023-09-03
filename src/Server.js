const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  user: "root",
  host: "https://url-shortener-backend-maf5.onrender.com",
  password: "root",
  database: "user-database",
})

app.post('/register', (req, res) => {
  const sql = "INSERT INTO `user-database`.`login` (`email`, `password`) VALUES (?, ?)";

  db.query(sql, [req.body.email, req.body.password], (error, result) => {
    if (result) {
      res.send(result);
    } else {
      res.send({ message: "Email Is Taken" });
    }
  });
})

app.post('/login', (req, res) => {
  const sql = "SELECT * FROM `user-database`.`login` WHERE `email` = ? AND `password` = ?";

  db.query(sql, [req.body.email, req.body.password], (error, result) => {
    // Returns an array [email, password].
    if (result.length > 0) {
      res.send(true);
    } else {
      res.send(false);
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
