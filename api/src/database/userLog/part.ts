import mysql from 'mysql2';

import getDatabaseConnection from '../../shared/database';
import { User } from '../../types/User';

type UserLogPartOptions = Pick<User, 'username'>;

const userLogPart = ({ username }: UserLogPartOptions) =>
  new Promise<number>((resolve, reject) => {
    const databaseConnection = getDatabaseConnection();
    databaseConnection.execute<mysql.ResultSetHeader>(
      { sql: 'CALL user_log_part(?)', values: [username] },
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
