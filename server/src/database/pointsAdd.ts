import mysql from 'mysql2';

import getDatabaseConnection from '../shared/getDatabaseConnection';
import { Points } from '../types/Points';

type PointsAddOptions = Pick<Points, 'points' | 'username'>;

const pointsAdd = ({ points, username }: PointsAddOptions) =>
  new Promise<void>((resolve, reject) => {
    const databaseConnection = getDatabaseConnection();
    databaseConnection.execute<mysql.ResultSetHeader>(
      { sql: 'CALL points_add(?, ?)', values: [points, username] },
      (error) => {
        if (error) {
          reject(new Error(`Failed to add points to user @${username}`));
        } else {
          resolve();
        }
      }
    );
  });

export default pointsAdd;
