import mysql from 'mysql2';

import getDatabaseConnection from '../shared/getDatabaseConnection';
import { User } from '../types/User';

type UserGetByUsernameOptions = Pick<User, 'username'>;

const userGetByUsername = ({ username }: UserGetByUsernameOptions) =>
  new Promise<User | null>((resolve, reject) => {
    const databaseConnection = getDatabaseConnection();
    databaseConnection.execute<mysql.RowDataPacket[][]>(
      'CALL user_get_by_username(?)',
      [username],
      (error, response) => {
        if (error) {
          reject(
            new Error(`Failed to get user '${username}': ${error.message}`)
          );
        } else {
          resolve(response[0].length > 0 ? (response[0][0] as User) : null);
        }
      }
    );
  });

export default userGetByUsername;
