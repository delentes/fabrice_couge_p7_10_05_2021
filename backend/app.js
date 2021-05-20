const express = require('express');
const mysql = require('mysql');
require('dotenv').config();



const db = mysql.createConnection({
    host: "",
    user: "",
    password: "",
    database: ""
});

db.connect(function(err) {
    if (err) throw err;
    console.log("Connecté à la base de données MySQL");
})

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(express.json());

module.exports = app;