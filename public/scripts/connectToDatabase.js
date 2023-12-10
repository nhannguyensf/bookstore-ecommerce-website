// Import mysql module
let mysql = require('mysql');

// Setup database connection parameter
let connection = mysql.createConnection({
  host: 'localhost',
  user: 'student',
  password: 'student',
  database: 'ecommerceBookstore'
});

// Connect with the database
connection.connect(function (e) {
  if (e) {
    // Show error message on failure
    return console.error('error: ' + e.message);
  }

  // Show success message if connected
  console.log('\nConnected to the MySQL server...\n');
});