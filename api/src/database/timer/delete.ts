import mysql from 'mysql2';

import getDatabaseConnection from '../../shared/database';
import { Timer } from '../../types/Timer';

type TimerDeleteOptions = Pick<Timer, 'id'>;

const timerDelete = ({ id }: TimerDeleteOptions) =>
  new Promise<void>((resolve, reject) => {
    const databaseConnection = getDatabaseConnection();
    databaseConnection.execute<mysql.ResultSetHeader>(
      {
        sql: 'CALL timer_delete(?)',
        values: [id],
      },
      (error) => {
        if (error) {
          reject(new Error(`Failed to delete timer ${id}: ${error.message}`));
        } else {
          resolve();
        }
      }
    );
  });

export default timerDelete;
