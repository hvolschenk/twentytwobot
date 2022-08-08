const getDatabaseConnection = require('../shared/getDatabaseConnection');

const userGetByUsername = ({ username }) => new Promise((resolve, reject) => {
  const databaseConnection = getDatabaseConnection();
  databaseConnection.execute(
    'CALL user_get_by_username(?)',
    [username],
    (error, response) => {
      if (error) {
        reject(new Error(`Failed to get user '${username}': ${error.message}`));
      } else {
        resolve(response[0].length > 0 ? response[0][0] : null);
      }
    },
  );
});

module.exports = userGetByUsername;
