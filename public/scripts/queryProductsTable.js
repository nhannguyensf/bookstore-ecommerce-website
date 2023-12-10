function queryProductsTable(parameters, condition) {
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
      isGreaterThanOrEqual: '>'
    };

    let conditionString = [];
    for (let key in condition) {
      conditionString.push(`${mysql.escapeId(key)} ${operatorSymbols[condition[key].operator]} ${mysql.escape(condition[key].value)}`);
    }
    query += ' WHERE ' + conditionString.join(' AND ');
  }

  // Query database
  connection.query(query, (error, results, fields) => {
    if (error) throw error;
    console.log(results);
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
