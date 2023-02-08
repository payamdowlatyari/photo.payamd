const express = require("express");
const app = express();
app.use(express.json());

const fs = require('fs');

// read photos.json
const data = fs.readFileSync('photos.json');
const photos = JSON.parse(data);

// read texts.json
const data2 = fs.readFileSync('texts.json');
const texts = JSON.parse(data2);

// To solve the cors issue
const cors = require('cors');
app.use(express.static('public'));
app.use(cors());

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'https://payamdowlatyari.github.io');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// GET request 1
app.get('/api/photos', (req, res) => {
    res.send(photos);
});

// GET request 2
app.get('/api/texts', (req, res) => {
    res.send(texts);
});

//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));