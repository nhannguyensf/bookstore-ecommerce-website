var message = 'CSC-317 startup template\n'
         + 'This template uses nodeJS, express, and express.static\n';

var port = 3000;
var path = require('path');
var express = require('express');
var app = express();
const fs = require('fs');
const db = require('./database');
const bcrypt = require("bcrypt");
const saltRounds = 10;

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

// Set up a route to product-page.html
app.get("/product-page", function (req, res) {
  res.sendFile(path.join(StaticDirectory, "product-page.html"));
});

//  Setup route to product page after clicking on a link and passing name as data
app.get('/api/product/:productName', async function(req, res) {
  try {
    const productName = req.params.productName;
    const productData = await db.queryProductsTable(['*'], {name: {operator: 'isEqual', value: [productName]}});
    if (productData.length > 0) {
      res.json(productData);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (err) {
    console.error("Failed to get product details:", err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Middleware
app.use(express.urlencoded({ extended: true }));

// Account creation endpoint
app.post('/createAccount', (req, res) => {
    const { email, password } = req.body;

    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            res.status(500).send('Error hashing password');
            return;
        }

        const sql = 'INSERT INTO Users (email, password_hash) VALUES (?, ?)';
        db.query(sql, [email, hash], (err, result) => {
            if (err) {
                res.status(500).send('Error creating account');
                return;
            }
            res.send('Account created successfully');
        });
    });
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
