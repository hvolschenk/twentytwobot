import mysql from 'mysql2';

import configuration from '../configuration';

let databaseConnection: mysql.Connection;

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

export default getDatabaseConnection;
