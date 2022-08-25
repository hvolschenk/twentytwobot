import getDatabaseConnection from '../shared/getDatabaseConnection';
import { CommandWithKeyword } from '../types/CommandWithKeyword';

const commandGetAll = () =>
  new Promise<CommandWithKeyword[]>((resolve, reject) => {
    const databaseConnection = getDatabaseConnection();
    databaseConnection.execute<CommandWithKeyword[][]>(
      { sql: 'CALL command_get_all()', values: [] },
      (error, response) => {
        if (error) {
          reject(new Error(`Failed to get all commands: ${error.message}`));
        } else {
          resolve(response[0] as CommandWithKeyword[]);
        }
      }
    );
  });

export default commandGetAll;
