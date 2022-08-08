const getDatabaseConnection = require('../shared/getDatabaseConnection');

const userCreate = ({
  displayName,
  lastGamePlayed,
  twitchID,
  username,
}) => new Promise((resolve, reject) => {
  const databaseConnection = getDatabaseConnection();
  databaseConnection.execute(
    'CALL user_create(?, ?, ?, ?)',
    [username, displayName, twitchID, lastGamePlayed],
    (error) => {
      if (error) {
        reject(new Error('Failed to create the new user'));
      } else {
        resolve();
      }
    },
  );
});

module.exports = userCreate;
