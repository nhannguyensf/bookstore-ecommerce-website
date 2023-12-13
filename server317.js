var message =
  "CSC-317 startup template\n" +
  "This template uses nodeJS, express, and express.static\n";

var port = 3000;
var path = require("path");
var express = require("express");
var app = express();
var StaticDirectory = path.join(__dirname, "public");
const bcrypt = require("bcrypt");
const db = require("./database");
const bodyParser = require("body-parser");

app.use(express.static(StaticDirectory));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set up a route for the home page
app.get("/", function (req, res) {
  res.sendFile(path.join(StaticDirectory, "index.html"));
});

// Set up a route to get featured products
app.get("/api/featuredProducts", async function (req, res) {
  try {
    const data = await db.queryProductsTable(["*"], {
      isFeatured: { operator: "isEqual", value: 1 },
    });
    res.json(data);
  } catch (err) {
    console.error("Failed to query featured products:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Set up a route to product-page.html
app.get("/product-page", function (req, res) {
  res.sendFile(path.join(StaticDirectory, "product-page.html"));
});


// Set up a route to filter-page.html
app.get("/filter-page", function (req, res) {
  res.sendFile(path.join(StaticDirectory, "filter-page.html"));
});

// Set up a route to product page after clicking on a product link and passing its name as data
app.get('/product/:productName', async function(req, res) {
  try {
    const productName = req.params.productName;
    const productData = await db.queryProductsTable(["*"], {
      name: { operator: "isEqual", value: productName },
    });
    if (productData.length > 0) {
      res.json(productData);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (err) {
    console.error("Failed to get product details:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


// Route for handling account creation
app.post("/create_account", async (req, res) => {
  try {
    const { email, passwd } = req.body;
    const saltRounds = 10;
    const passwordHash = bcrypt.hashSync(passwd, saltRounds); // Hashing the password

    await db.insertUser(email, passwordHash);
    res.status(200).send("Account created successfully");
  } catch (error) {
    console.error("Account creation failed:", error);
    res.status(500).send("Error occurred during account creation");
  }
});

// Set up a route to filter page after clicking on a navigation link and passing its product type as data
app.get('/filter/:productType', async function(req, res) {
  try {
    const productType = req.params.productType;
    const productData = await db.queryProductsTable(['*'], {type: {operator: 'isEqual', value: [productType]}});
    console.log(productData); // Log the database data here
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

// Set up route to filter page after clicking price filter
app.get('/filter/price/:productPrice', async function(req, res) {
  try {
    const productPrice = parseFloat(req.params.productPrice);

    // Modify the query based on the price range or specific price you want to filter
    const productData = await db.queryProductsTable(['*'], { price: { operator: 'isLessThanOrEqual', value: [productPrice.toFixed(2)] } });

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




// Start the server
var server = app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}/`);
});

// Listen for SIGINT and SIGTERM signals and close the DB connection before exit
process.on("SIGINT", closeServerAndDatabaseConnection);
process.on("SIGTERM", closeServerAndDatabaseConnection);

function closeServerAndDatabaseConnection() {
  // Close the database pool
  db.closeDatabaseConnection()
    .then(() => {
      console.log("Pool closed");
      server.close(() => {
        console.log("Server closed");
        process.exit(0); // Exit with a zero status code (success)
      });
    })
    .catch((err) => {
      console.error("Error closing the pool", err);
    });
}

console.log(message);
