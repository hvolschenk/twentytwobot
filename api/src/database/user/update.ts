import mysql from 'mysql2';

import getDatabaseConnection from '../../shared/database';
import { User } from '../../types/User';

type UserUpdateOptions = Pick<
  User,
  'displayName' | 'id' | 'lastGamePlayed' | 'twitchID'
>;

const userUpdate = ({
  displayName,
  id,
  lastGamePlayed,
  twitchID,
}: UserUpdateOptions) =>
  new Promise<void>((resolve, reject) => {
    const databaseConnection = getDatabaseConnection();
    databaseConnection.execute<mysql.ResultSetHeader>(
      {
        sql: 'CALL user_update(?, ?, ?, ?)',
        values: [id, displayName, twitchID, lastGamePlayed],
      },
      (error) => {
        if (error) {
          reject(new Error('Failed to update the user'));
        } else {
          resolve();
        }
      }
    );
  });

export default userUpdate;
