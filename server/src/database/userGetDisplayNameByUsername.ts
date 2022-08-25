import { RowDataPacket } from 'mysql2';

import getDatabaseConnection from '../shared/getDatabaseConnection';
import { User } from '../types/User';

type UserGetDisplayNameByUsernameOptions = Pick<User, 'username'>;

interface UserDisplayName extends RowDataPacket {
  displayName: User['displayName'];
}

const userGetDisplayNameByUsername = ({
  username,
}: UserGetDisplayNameByUsernameOptions) =>
  new Promise<Pick<User, 'displayName'> | null>((resolve, reject) => {
    const databaseConnection = getDatabaseConnection();
    databaseConnection.execute<UserDisplayName[][]>(
      { sql: 'CALL user_get_display_name_by_username(?)', values: [username] },
      (error, response) => {
        if (error) {
          reject(
            new Error(
              `Failed to get user's display name '${username}': ${error.message}`
            )
          );
        } else {
          resolve(response[0].length > 0 ? response[0][0] : null);
        }
      }
    );
  });

export default userGetDisplayNameByUsername;
