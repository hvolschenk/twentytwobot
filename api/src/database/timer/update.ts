import mysql from 'mysql2';

import getDatabaseConnection from '../../shared/database';
import { Timer } from '../../types/Timer';

type TimerUpdateOptions = Pick<Timer, 'id' | 'intervalSeconds' | 'name'>;

const timerUpdate = ({ id, intervalSeconds, name }: TimerUpdateOptions) =>
  new Promise<void>((resolve, reject) => {
    const databaseConnection = getDatabaseConnection();
    databaseConnection.execute<mysql.ResultSetHeader>(
      {
        sql: 'CALL timer_update(?, ?, ?)',
        values: [id, name, intervalSeconds],
      },
      (error) => {
        if (error) {
          reject(new Error(`Failed to update timer ${id}: ${error.message}`));
        } else {
          resolve();
        }
      }
    );
  });

export default timerUpdate;
