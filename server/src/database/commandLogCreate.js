const commandLogCreate = (mysqlConnection, commandName, username) => new Promise((resolve, reject) => {
  mysqlConnection.execute(
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
