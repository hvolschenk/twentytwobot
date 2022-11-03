import getDatabaseConnection from '../../shared/database';
import { ShoutoutLog } from '../../types/ShoutoutLog';
import { User } from '../../types/User';

interface ShoutoutLogFilterOptions {
  count: number;
  usernameFrom?: User['username'];
  usernameTo: User['username'];
}

const shoutoutLogFilter = ({
  count,
  usernameFrom,
  usernameTo,
}: ShoutoutLogFilterOptions) =>
  new Promise<ShoutoutLog[]>((resolve, reject) => {
    const databaseConnection = getDatabaseConnection();

    databaseConnection.execute<ShoutoutLog[][]>(
      {
        sql: 'CALL shoutout_log_filter(?, ?, ?)',
        values: [usernameFrom || null, usernameTo, count],
      },
      (error, response) => {
        if (error) {
          reject(
            new Error(
              `Failed to filter shoutout logs (from '${usernameFrom}', to '${usernameTo}'): ${error.message}`
            )
          );
        } else {
          resolve(response[0]);
        }
      }
    );
  });

export default shoutoutLogFilter;
