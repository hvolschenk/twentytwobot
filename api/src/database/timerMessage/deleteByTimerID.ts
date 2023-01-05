import mysql from 'mysql2';

import getDatabaseConnection from '../../shared/database';
import { TimerMessage } from '../../types/TimerMessage';

type TimerMessageDeleteByTimerIDOptions = Pick<TimerMessage, 'timerID'>;

const timerMessageDeleteByTimerID = ({
  timerID,
}: TimerMessageDeleteByTimerIDOptions) =>
  new Promise<void>((resolve, reject) => {
    const databaseConnection = getDatabaseConnection();
    databaseConnection.execute<mysql.ResultSetHeader>(
      {
        sql: 'CALL timer_message_delete_by_timer_id(?)',
        values: [timerID],
      },
      (error) => {
        if (error) {
          reject(
            new Error(
              `Failed to delete messages for timer ${timerID}: ${error.message}`
            )
          );
        } else {
          resolve();
        }
      }
    );
  });

export default timerMessageDeleteByTimerID;
