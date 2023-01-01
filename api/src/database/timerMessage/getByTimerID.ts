import getDatabaseConnection from '../../shared/database';
import { TimerMessage } from '../../types/TimerMessage';
import { Timer } from '../../types/Timer';

interface TimerMessageGetByTimerIDOptions {
  timerID: Timer['id'];
}

const timerMessageGetByTimerID = ({
  timerID,
}: TimerMessageGetByTimerIDOptions) =>
  new Promise<TimerMessage[]>((resolve, reject) => {
    const databaseConnection = getDatabaseConnection();
    databaseConnection.execute<TimerMessage[][]>(
      {
        sql: 'CALL timer_message_get_by_timer_id(?)',
        values: [timerID],
      },
      (error, response) => {
        if (error) {
          reject(
            new Error(
              `Failed to get timer messages by timer ID '${timerID}': ${error.message}`
            )
          );
        } else {
          resolve(response[0]);
        }
      }
    );
  });

export default timerMessageGetByTimerID;
