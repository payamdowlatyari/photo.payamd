const express = require("express");
const app = express();
app.use(express.json());

const fs = require('fs');
const data = fs.readFileSync('photos.json');
const items = JSON.parse(data);

// To solve the cors issue
const cors = require('cors');
app.use(express.static('public'));
app.use(cors());

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// GET request
app.get('/api/photos', (req, res) => {
    res.send(photos);
});

//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));