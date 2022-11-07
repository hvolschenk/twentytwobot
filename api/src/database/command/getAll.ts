import getDatabaseConnection from '../../shared/database';
import { Command } from '../../types/Command';

const commandGetAll = () =>
  new Promise<Command[]>((resolve, reject) => {
    const databaseConnection = getDatabaseConnection();
    databaseConnection.execute<Command[][]>(
      { sql: 'CALL command_get_all()', values: [] },
      (error, response) => {
        if (error) {
          reject(new Error(`Failed to get all commands: ${error.message}`));
        } else {
          resolve(response[0]);
        }
      }
    );
  });

export default commandGetAll;
