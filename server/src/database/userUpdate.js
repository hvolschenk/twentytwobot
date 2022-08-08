const getDatabaseConnection = require('../shared/getDatabaseConnection');

const userUpdate = ({
  displayName,
  id,
  lastGamePlayed,
  twitchID,
}) => new Promise((resolve, reject) => {
  const databaseConnection = getDatabaseConnection();
  databaseConnection.execute(
    'CALL user_update(?, ?, ?, ?)',
    [id, displayName, twitchID, lastGamePlayed],
    (error) => {
      if (error) {
        reject(new Error('Failed to update the user'));
      } else {
        resolve();
      }
    },
  );
});

module.exports = userUpdate;
