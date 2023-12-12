// Import mysql module
let mysql = require('mysql');
let connection;

function connectToDatabase() {
  return new Promise((resolve, reject) => {
    connection = mysql.createConnection({
      host: 'localhost',
      user: 'student',
      password: 'student',
      database: 'ecommerceBookstore'
    });

    connection.connect(function (e) {
      if (e) {
        console.error('error: ' + e.message);
        reject(e);  // Reject the promise with the error
      } else {
        console.log('\nConnected to the MySQL server...\n');
        resolve(); // Resolve the promise as the connection was successful
      }
    });
  });
}

function queryProductsTable(parameters, condition) {
  return new Promise((resolve, reject) => {
    const table = 'Products';
    let query = `SELECT ${parameters.join(', ')} FROM ${table}`;

    // Insert WHERE clause
    if (condition && Object.keys(condition).length) {
      let operatorSymbols = {
        isEqual: '=',
        isNotEqual: '!=',
        isLessThan: '<',
        isLessThanOrEqual: '<=',
        isGreaterThan: '>',
        isGreaterThanOrEqual: '>='
      };

      let conditionString = [];
      for (let key in condition) {
        conditionString.push(`${mysql.escapeId(key)} ${operatorSymbols[condition[key].operator]} ${mysql.escape(condition[key].value)}`);
      }
      query += ' WHERE ' + conditionString.join(' AND ');
    }

    // Query database
    connection.query(query, (error, results, fields) => {
      if (error) {
        reject(error); return; // reject promise if error
      }
      resolve(results); // resolve promise with results
    });
  });
}

/*
Example Usages:
1. Select all records from the 'Products' table:
    queryProductsTable(['*']);

    This would execute the following SQL command:
    SELECT * FROM Products

2. Select 'name' and 'price' fields from the 'Products' table where 'price' is more than 20:
    queryProductsTable(['name', 'price'], {price: {operator: 'isMoreThan', value: '20'} });

    This would execute the following SQL command:
    SELECT name, price FROM Products WHERE price > 20

3. Select 'name' field from the 'Products' table where 'name' is not equal to 'Apple':
    queryProductsTable(['name'], {name: {operator: 'isNotEqual', value: 'Apple'} });

    This would execute the following SQL command:
    SELECT name FROM Products WHERE name != 'Apple'
*/

// Close the database connection
function closeDatabaseConnection() {
  connection.end(function () {
    console.log('\nConnection closed. \n')
  });
}


module.exports = {
  connectToDatabase,
  queryProductsTable,
  closeDatabaseConnection
};