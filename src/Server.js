const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const mongo = new MongoClient("mongodb+srv://url-shortener:root@cluster0.ikvupbn.mongodb.net/info?retryWrites=true&w=majority");

app.post('/register', (req, res) => {
  async function register() {
    try {
      const data = await mongo.db().collection("info")
        .insertOne({ email: req.body.email, password: req.body.password })

      if (data) {
        res.send(data);
      } else {
        res.send({ message: "Email Is Taken" });
      }
    }
    catch (e) {
      console.log(e);
    }
  }
  register();
});

app.get('/login', (req, res) => {
  async function login() {
    try {
      const data = mongo.db().collection("info")
        .find({ email: req.query.email, password: req.query.password})
        .toArray();

      if (data) {
        res.send(true);
      } else {
        res.send(false);
      }
    }
    catch (e) {
      console.log(e);
    }
  }
  login();
})

app.get('/user', (req, res)=>{
  async function receive() {
    try {
      const data = await mongo.db().collection("info").find({ email: req.query.email }).toArray();

      if (data) {
        res.send(data);
      }
    }
    catch (e) {
      console.log(e);
    }
  }
  receive();
})

app.post('/add', (req, res) => {
  async function add() {
    try {
      await mongo.db().collection("info")
        .updateOne({ email: req.body.email }, { $set: { links: req.body.links }});
    }
    catch (e) {
      console.log(e);
    }
  }
  if (req.body.links) {
    add();
  } 
});

// Ensures the server is loaded.
app.listen(3306, () => {
  console.log("running");
  async function run() {
    try {
      await mongo.connect().then(() => console.log("loaded"));
    }
    catch (e) {
      console.log(e);
    }
  }
  run();
})
