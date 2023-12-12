var message = 'CSC-317 startup template\n'
         + 'This template uses nodeJS, express, and express.static\n';

var port = 3000;
var path = require('path');
var express = require('express');
var app = express();
const fs = require('fs');
const db = require('./database');

var StaticDirectory = path.join(__dirname, 'public');

app.use(express.static(StaticDirectory));

// Connect to the database
db.connectToDatabase().catch(error => {
  console.error('Failed to connect to database:', error);
  process.exit(1);
});

// Set up a route for the home page
app.get('/', function(req, res) {
    res.sendFile(path.join(StaticDirectory, 'index.html'));
});



app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}/`);
});

console.log(message);
