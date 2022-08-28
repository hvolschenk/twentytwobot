import getDatabaseConnection from '../shared/getDatabaseConnection';
import { TimerWithMessage } from '../types/TimerWithMessage';

type TimerGetByIDOptions = Pick<TimerWithMessage, 'id'>;

const timerGetByID = ({ id }: TimerGetByIDOptions) =>
  new Promise<TimerWithMessage | null>((resolve, reject) => {
    const databaseConnection = getDatabaseConnection();
    databaseConnection.execute<TimerWithMessage[][]>(
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
