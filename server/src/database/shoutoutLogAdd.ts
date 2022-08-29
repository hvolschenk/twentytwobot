import mysql from 'mysql2';

import getDatabaseConnection from '../shared/getDatabaseConnection';
import { User } from '../types/User';

interface ShoutoutLogAddOptions {
  usernameFrom: User['username'];
  usernameTo: User['username'];
}

const shoutoutLogAdd = ({ usernameFrom, usernameTo }: ShoutoutLogAddOptions) =>
  new Promise<number>((resolve, reject) => {
    const databaseConnection = getDatabaseConnection();
    databaseConnection.execute<mysql.ResultSetHeader>(
      {
        sql: 'CALL shoutout_log_add(?, ?)',
        values: [usernameFrom, usernameTo],
      },
      (error, result) => {
        if (error) {
          reject(
            new Error(`Failed to add a shoutout log entry: ${error.message}`)
          );
        } else {
          resolve(result.insertId);
        }
      }
    );
  });

export default shoutoutLogAdd;
