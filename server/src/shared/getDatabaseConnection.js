const mysql = require('mysql2');

const configuration = require('../configuration');

let databaseConnection;

const getDatabaseConnection = () => {
  if (!databaseConnection) {
    databaseConnection = mysql.createConnection({
      database: configuration.mySQL.database(),
      host: configuration.mySQL.host(),
      password: configuration.mySQL.password(),
      user: configuration.mySQL.username(),
    });
  }
  return databaseConnection;
};

module.exports = getDatabaseConnection;
