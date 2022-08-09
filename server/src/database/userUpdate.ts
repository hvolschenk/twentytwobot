import mysql from 'mysql2';

import getDatabaseConnection from '../shared/getDatabaseConnection';
import { User } from '../types/User';

type UserUpdateOptions = Pick<User, 'displayName' | 'id' | 'lastGamePlayed' | 'twitchID'>;

const userUpdate = ({
  displayName,
  id,
  lastGamePlayed,
  twitchID,
}: UserUpdateOptions) => new Promise<void>((resolve, reject) => {
  const databaseConnection = getDatabaseConnection();
  databaseConnection.execute<mysql.ResultSetHeader>(
    'CALL user_update(?, ?, ?, ?)',
    [id, displayName, twitchID, lastGamePlayed],
    (error, result) => {
      if (error) {
        reject(new Error('Failed to update the user'));
      } else {
        resolve();
      }
    },
  );
});

export default userUpdate;
