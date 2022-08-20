import mysql from 'mysql2';

import getDatabaseConnection from '../shared/getDatabaseConnection';
import { User } from '../types/User';

type UserLogJoinOptions = Pick<User, 'username'>;

const userLogJoin = ({ username }: UserLogJoinOptions) =>
  new Promise<number>((resolve, reject) => {
    const databaseConnection = getDatabaseConnection();
    databaseConnection.execute<mysql.ResultSetHeader>(
      'CALL user_log_join(?)',
      [username],
      (error, result) => {
        if (error) {
          reject(new Error(`Failed to add a JOIN log entry: ${error.message}`));
        } else {
          resolve(result.insertId);
        }
      }
    );
  });

export default userLogJoin;
