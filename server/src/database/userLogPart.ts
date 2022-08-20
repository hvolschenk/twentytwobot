import mysql from 'mysql2';

import getDatabaseConnection from '../shared/getDatabaseConnection';
import { User } from '../types/User';

type UserLogPartOptions = Pick<User, 'username'>;

const userLogPart = ({ username }: UserLogPartOptions) =>
  new Promise<number>((resolve, reject) => {
    const databaseConnection = getDatabaseConnection();
    databaseConnection.execute<mysql.ResultSetHeader>(
      'CALL user_log_part(?)',
      [username],
      (error, result) => {
        if (error) {
          reject(new Error(`Failed to add a PART log entry: ${error.message}`));
        } else {
          resolve(result.insertId);
        }
      }
    );
  });

export default userLogPart;
