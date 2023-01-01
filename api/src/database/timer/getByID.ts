import getDatabaseConnection from '../../shared/database';
import { Timer } from '../../types/Timer';

type TimerGetByIDOptions = Pick<Timer, 'id'>;

const timerGetByID = ({ id }: TimerGetByIDOptions) =>
  new Promise<Timer | null>((resolve, reject) => {
    const databaseConnection = getDatabaseConnection();
    databaseConnection.execute<Timer[][]>(
      { sql: 'CALL timer_get_by_id(?)', values: [id] },
      (error, response) => {
        if (error) {
          reject(new Error(`Failed to get timer '${id}': ${error.message}`));
        } else {
          resolve(response[0].length > 0 ? response[0][0] : null);
        }
      }
    );
  });

export default timerGetByID;
