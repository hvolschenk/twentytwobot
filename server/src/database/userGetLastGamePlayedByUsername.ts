import { RowDataPacket } from 'mysql2';

import getDatabaseConnection from '../shared/getDatabaseConnection';
import { User } from '../types/User';

type UserGetLastGamePlayedByUsernameOptions = Pick<User, 'username'>;

interface UserLastGamePlayed extends RowDataPacket {
  lastGamePlayed: User['lastGamePlayed'];
}

const userGetLastGamePlayedDisplayNameByUsername = ({
  username,
}: UserGetLastGamePlayedByUsernameOptions) =>
  new Promise<Pick<User, 'lastGamePlayed'> | null>((resolve, reject) => {
    const databaseConnection = getDatabaseConnection();
    databaseConnection.execute<UserLastGamePlayed[][]>(
      'CALL user_get_last_game_played_by_username(?)',
      [username],
      (error, response) => {
        if (error) {
          reject(
            new Error(
              `Failed to get user's last game played '${username}': ${error.message}`
            )
          );
        } else {
          resolve(response[0].length > 0 ? response[0][0] : null);
        }
      }
    );
  });

export default userGetLastGamePlayedDisplayNameByUsername;
