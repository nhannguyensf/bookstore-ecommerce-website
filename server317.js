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

// Set up a route to get featured products
app.get('/api/featuredProducts', async function(req, res) {
  try {
    const data = await db.queryProductsTable(['*'], {isFeatured: {operator: 'isEqual', value: 1} });
    res.json(data);
  } catch (err) {
    console.error("Failed to query featured products:", err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Start the server
app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}/`);
});

// Listen for SIGINT and SIGTERM signals and close the DB connection before exit
process.on('SIGINT', closeServerAndDatabaseConnection);
process.on('SIGTERM', closeServerAndDatabaseConnection);

function closeServerAndDatabaseConnection() {
  // Close the database connection
  db.closeDatabaseConnection().then(() => {
    console.log("Disconnected from database");
    server.close(() => {
      console.log("Server closed");
      process.exit(0); // Exit with a zero status code (success)
    });
  });
}


console.log(message);
