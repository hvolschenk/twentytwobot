const userCreate = (mysqlConnection, username) => new Promise((resolve, reject) => {
  mysqlConnection.execute(
    'CALL user_create(?)',
    [username],
    (error) => {
      if (error) {
        reject(new Error('Failed to insert the new user'));
      } else {
        resolve();
      }
    },
  );
});

module.exports = userCreate;
