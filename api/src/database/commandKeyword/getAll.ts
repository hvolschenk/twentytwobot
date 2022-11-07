import getDatabaseConnection from '../../shared/database';
import { CommandKeyword } from '../../types/CommandKeyword';

const commandKeywordGetAll = () =>
  new Promise<CommandKeyword[]>((resolve, reject) => {
    const databaseConnection = getDatabaseConnection();
    databaseConnection.execute<CommandKeyword[][]>(
      { sql: 'CALL command_keyword_get_all()', values: [] },
      (error, response) => {
        if (error) {
          reject(
            new Error(`Failed to get all command keywords: ${error.message}`)
          );
        } else {
          resolve(response[0] as CommandKeyword[]);
        }
      }
    );
  });

export default commandKeywordGetAll;
