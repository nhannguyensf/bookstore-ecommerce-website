// Import mysql module
let mysql = require('mysql');

// Create a pool of connections
const pool = mysql.createPool({
  connectionLimit: 10, // You can set the limit as per your application's need
  host: 'localhost',
  user: 'student',
  password: 'student',
  database: 'ecommerceBookstore'
});

function insertUser(email, passwordHash) {
  return new Promise((resolve, reject) => {
    const query = "INSERT INTO Users (email, password_hash) VALUES (?, ?)";
    pool.query(query, [email, passwordHash], (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
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

    // Query the database using the pool
    pool.query(query, (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
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

// Close all connections in the pool
function closeDatabaseConnection() {
  return new Promise((resolve, reject) => {
    pool.end(function (err) {
      if (err) {
        console.error('Error closing the pool', err);
        reject(err);
      } else {
        console.log('\nAll connections in the pool have been closed.\n');
        resolve();
      }
    });
  });
}


module.exports = {
  insertUser,
  queryProductsTable,
  closeDatabaseConnection,
};