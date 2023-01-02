import mysql from 'mysql2';

import getDatabaseConnection from '../../shared/database';
import { Timer } from '../../types/Timer';

type TimerCreateOptions = Pick<Timer, 'intervalSeconds' | 'name'>;

const timerCreate = ({ intervalSeconds, name }: TimerCreateOptions) =>
  new Promise<number>((resolve, reject) => {
    const databaseConnection = getDatabaseConnection();
    databaseConnection.execute<mysql.ResultSetHeader>(
      {
        sql: 'CALL timer_create(?, ?)',
        values: [name, intervalSeconds],
      },
      (error, result) => {
        if (error) {
          reject(new Error(`Failed to create the new timer: ${error.message}`));
        } else {
          resolve(result.insertId);
        }
      }
    );
  });

export default timerCreate;
