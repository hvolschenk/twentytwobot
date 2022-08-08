const getDatabaseConnection = require('../shared/getDatabaseConnection');

const commandLogCreate = ({ commandName, username }) => new Promise((resolve, reject) => {
  const databaseConnection = getDatabaseConnection();
  databaseConnection.execute(
    'CALL command_log_create(?, ?)',
    [commandName, username || ''],
    (error) => {
      if (error) {
        reject(new Error(`Failed to log the command being called, ${error.message}`));
      } else {
        resolve();
      }
    },
  );
});

module.exports = commandLogCreate;
