import getDatabaseConnection from '../shared/getDatabaseConnection';
import { PointsWithUser } from '../types/PointsWithUser';

interface PointsGetTopOptions {
  count?: number;
}

const pointsGetTop = ({ count = 10 }: PointsGetTopOptions) =>
  new Promise<PointsWithUser[]>((resolve, reject) => {
    const databaseConnection = getDatabaseConnection();
    databaseConnection.execute<PointsWithUser[][]>(
      { sql: 'CALL points_get_top(?)', values: [count] },
      (error, response) => {
        if (error) {
          reject(new Error(`Failed to get top ${count} points`));
        } else {
          resolve(response[0]);
        }
      }
    );
  });

export default pointsGetTop;
