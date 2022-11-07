import getDatabaseConnection from '../../shared/database';
import { Points } from '../../types/Points';

interface PointsGetTopOptions {
  count?: number;
}

const pointsGetTop = ({ count = 10 }: PointsGetTopOptions) =>
  new Promise<Points[]>((resolve, reject) => {
    const databaseConnection = getDatabaseConnection();
    databaseConnection.execute<Points[][]>(
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
