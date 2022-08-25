import getDatabaseConnection from '../shared/getDatabaseConnection';
import { PointsWithUser } from '../types/PointsWithUser';

type PointsGetByUsernameOptions = Pick<PointsWithUser, 'username'>;

const pointsGetByUsername = ({ username }: PointsGetByUsernameOptions) =>
  new Promise<PointsWithUser | null>((resolve, reject) => {
    const databaseConnection = getDatabaseConnection();
    databaseConnection.execute<PointsWithUser[][]>(
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
