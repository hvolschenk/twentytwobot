import mysql from 'mysql2';

import getDatabaseConnection from '../../shared/database';
import { CommandKeyword } from '../../types/CommandKeyword';

type CommandKeywordDeleteByCommandIDOptions = Pick<CommandKeyword, 'commandID'>;

const commandKeywordDeleteByCommandID = ({
  commandID,
}: CommandKeywordDeleteByCommandIDOptions) =>
  new Promise<void>((resolve, reject) => {
    const databaseConnection = getDatabaseConnection();
    databaseConnection.execute<mysql.ResultSetHeader>(
      {
        sql: 'CALL command_keyword_delete_by_command_id(?)',
        values: [commandID],
      },
      (error) => {
        if (error) {
          reject(
            new Error(
              `Failed to delete keywords for command ${commandID}: ${error.message}`
            )
          );
        } else {
          resolve();
        }
      }
    );
  });

export default commandKeywordDeleteByCommandID;
