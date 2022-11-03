import getDatabaseConnection from '../../shared/database';
import { Points } from '../../types/Points';
import { User } from '../../types/User';

type PointsGetByUsernameOptions = Pick<User, 'username'>;

const pointsGetByUsername = ({ username }: PointsGetByUsernameOptions) =>
  new Promise<Points | null>((resolve, reject) => {
    const databaseConnection = getDatabaseConnection();
    databaseConnection.execute<Points[][]>(
      { sql: 'CALL points_get_by_username(?)', values: [username] },
      (error, response) => {
        if (error) {
          reject(new Error(`Failed to get points for user @${username}`));
        } else {
          resolve(response[0].length > 0 ? response[0][0] : null);
        }
      }
    );
  });

export default pointsGetByUsername;
