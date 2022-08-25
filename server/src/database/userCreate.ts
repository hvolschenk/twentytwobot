import mysql from 'mysql2';

import getDatabaseConnection from '../shared/getDatabaseConnection';
import { User } from '../types/User';

type UserCreateOptions = Pick<
  User,
  'displayName' | 'lastGamePlayed' | 'twitchID' | 'username'
>;

const userCreate = ({
  displayName,
  lastGamePlayed,
  twitchID,
  username,
}: UserCreateOptions) =>
  new Promise<number>((resolve, reject) => {
    const databaseConnection = getDatabaseConnection();
    databaseConnection.execute<mysql.ResultSetHeader>(
      {
        sql: 'CALL user_create(?, ?, ?, ?)',
        values: [username, displayName, twitchID, lastGamePlayed],
      },
      (error, result) => {
        if (error) {
          reject(new Error(`Failed to create the new user: ${error.message}`));
        } else {
          resolve(result.insertId);
        }
      }
    );
  });

export default userCreate;
