import getDatabaseConnection from '../../shared/database';
import { Command } from '../../types/Command';

type CommandGetByNameOptions = Pick<Command, 'name'>;

const commandGetByName = ({ name }: CommandGetByNameOptions) =>
  new Promise<Command | null>((resolve, reject) => {
    const databaseConnection = getDatabaseConnection();
    databaseConnection.execute<Command[][]>(
      { sql: 'CALL command_get_by_name(?)', values: [name] },
      (error, response) => {
        if (error) {
          reject(
            new Error(
              `Failed to get command by name '${name}': ${error.message}`
            )
          );
        } else {
          resolve(response[0].length > 0 ? response[0][0] : null);
        }
      }
    );
  });

export default commandGetByName;
