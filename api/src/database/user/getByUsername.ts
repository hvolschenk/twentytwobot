import getDatabaseConnection from '../../shared/database';
import { User } from '../../types/User';

type UserGetByUsernameOptions = Pick<User, 'username'>;

const userGetByUsername = ({ username }: UserGetByUsernameOptions) =>
  new Promise<User | null>((resolve, reject) => {
    const databaseConnection = getDatabaseConnection();

    databaseConnection.execute<User[][]>(
      { sql: 'CALL user_get_by_username(?)', values: [username] },
      (error, response) => {
        if (error) {
          reject(
            new Error(`Failed to get user '${username}': ${error.message}`)
          );
        } else {
          resolve(response[0].length > 0 ? response[0][0] : null);
        }
      }
    );
  });

export default userGetByUsername;
