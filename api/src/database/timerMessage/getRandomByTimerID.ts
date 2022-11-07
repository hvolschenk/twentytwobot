import getDatabaseConnection from '../../shared/database';
import { TimerMessage } from '../../types/TimerMessage';
import { Timer } from '../../types/Timer';

interface TimerMessageGetRandomByTimerIDOptions {
  timerID: Timer['id'];
}

const timerMessageGetRandomByTimerID = ({
  timerID,
}: TimerMessageGetRandomByTimerIDOptions) =>
  new Promise<TimerMessage | null>((resolve, reject) => {
    const databaseConnection = getDatabaseConnection();
    databaseConnection.execute<TimerMessage[][]>(
      {
        sql: 'CALL timer_message_get_random_by_timer_id(?)',
        values: [timerID],
      },
      (error, response) => {
        if (error) {
          reject(
            new Error(
              `Failed to get random timer message by timer ID '${timerID}': ${error.message}`
            )
          );
        } else {
          resolve(response[0].length > 0 ? response[0][0] : null);
        }
      }
    );
  });

export default timerMessageGetRandomByTimerID;
