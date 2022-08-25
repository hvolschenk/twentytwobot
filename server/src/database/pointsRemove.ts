import mysql from 'mysql2';

import getDatabaseConnection from '../shared/getDatabaseConnection';
import { Points } from '../types/Points';

type PointsRemoveOptions = Pick<Points, 'points' | 'username'>;

const pointsRemove = ({ points, username }: PointsRemoveOptions) =>
  new Promise<void>((resolve, reject) => {
    const databaseConnection = getDatabaseConnection();
    databaseConnection.execute<mysql.ResultSetHeader>(
      { sql: 'CALL points_remove(?, ?)', values: [points, username] },
      (error) => {
        if (error) {
          reject(
            new Error(
              `Failed to remove points from user ${username}: ${error.message}`
            )
          );
        } else {
          resolve();
        }
      }
    );
  });

export default pointsRemove;
