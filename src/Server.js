const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  user: "sql9648319",
  host: "sql9.freesqldatabase.com",
  password: "6fxjJyMLiA",
  database: "sql9648319",
})

app.post('/register', (req, res) => {
  const sql = "INSERT INTO `sql9648319`.`database` (email, password) VALUES (?, ?)";

  db.query(sql, [req.body.email, req.body.password], (error, result) => {
    if (result) {
      res.send(result);
    } else {
      res.send({ message: "Email Is Taken" });
    }
  });
});

app.get('/login', (req, res) => {
  const sql = "SELECT email, password FROM `sql9648319`.`database` WHERE `email` = ? AND `password` = ?";

  db.query(sql, [req.query.email, req.query.password], (error, result) => {
    // Returns an array [email, password].
    if (result.length > 0) {
      res.send(true);
    } else {
      res.send(false);
    }
  });
})

app.get('/user',(req,res)=>{
  const sql = "SELECT links FROM `sql9648319`.`database` WHERE `email` = ?";

  db.query(sql, [req.query.email], (error, result) => {
    if (result) {
      res.send(result);
    } else {
      console.log(error);
    }
  });
})

app.post('/add', (req, res) => {
  if (req.body.links) {
    const sql = "UPDATE `sql9648319`.`database` SET `links` = ? WHERE `email` = ?";
    db.query(sql, [req.body.links, req.body.email], (error, result) => {
      if (error) {
        console.log(error);
      }
    });
  } 
});

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
