import getDatabaseConnection from '../shared/getDatabaseConnection';
import { ShoutoutLog } from '../types/ShoutoutLog';
import { User } from '../types/User';

type ShoutoutLogGetLatestByUsernameToOptions = Pick<User, 'username'>;

const shoutoutLogGetLatestByUsernameTo = ({
  username,
}: ShoutoutLogGetLatestByUsernameToOptions) =>
  new Promise<ShoutoutLog | null>((resolve, reject) => {
    const databaseConnection = getDatabaseConnection();

    databaseConnection.execute<ShoutoutLog[][]>(
      {
        sql: 'CALL shoutout_log_get_latest_by_username_to(?)',
        values: [username],
      },
      (error, response) => {
        if (error) {
          reject(
            new Error(
              `Failed to get shoutout by username '${username}': ${error.message}`
            )
          );
        } else {
          resolve(response[0].length > 0 ? response[0][0] : null);
        }
      }
    );
  });

export default shoutoutLogGetLatestByUsernameTo;
