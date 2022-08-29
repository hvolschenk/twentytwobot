import getDatabaseConnection from '../shared/getDatabaseConnection';
import { ShoutoutLog } from '../types/ShoutoutLog';
import { User } from '../types/User';

interface ShoutoutLogGetLatestByUsernamesFromToOptions {
  usernameFrom: User['username'];
  usernameTo: User['username'];
}

const shoutoutLogGetLatestByUsernamesFromTo = ({
  usernameFrom,
  usernameTo,
}: ShoutoutLogGetLatestByUsernamesFromToOptions) =>
  new Promise<ShoutoutLog | null>((resolve, reject) => {
    const databaseConnection = getDatabaseConnection();

    databaseConnection.execute<ShoutoutLog[][]>(
      {
        sql: 'CALL shoutout_log_get_latest_by_usernames_from_to(?, ?)',
        values: [usernameFrom, usernameTo],
      },
      (error, response) => {
        if (error) {
          reject(
            new Error(
              `Failed to get shoutout by usernames (from '${usernameFrom}', to '${usernameTo}'): ${error.message}`
            )
          );
        } else {
          resolve(response[0].length > 0 ? response[0][0] : null);
        }
      }
    );
  });

export default shoutoutLogGetLatestByUsernamesFromTo;
