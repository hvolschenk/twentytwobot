import getDatabaseConnection from '../shared/getDatabaseConnection';
import { Timer } from '../types/Timer';

const timerGetAll = () =>
  new Promise<Timer[]>((resolve, reject) => {
    const databaseConnection = getDatabaseConnection();
    databaseConnection.execute<Timer[][]>(
      { sql: 'CALL timer_get_all()', values: [] },
      (error, response) => {
        if (error) {
          reject(new Error(`Failed to get all timers: ${error.message}`));
        } else {
          resolve(response[0] as Timer[]);
        }
      }
    );
  });

export default timerGetAll;
