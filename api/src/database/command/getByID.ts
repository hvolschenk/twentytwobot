import getDatabaseConnection from '../../shared/database';
import { Command } from '../../types/Command';

type CommandGetByIDOptions = Pick<Command, 'id'>;

const commandGetByID = ({ id }: CommandGetByIDOptions) =>
  new Promise<Command | null>((resolve, reject) => {
    const databaseConnection = getDatabaseConnection();
    databaseConnection.execute<Command[][]>(
      { sql: 'CALL command_get_by_id(?)', values: [id] },
      (error, response) => {
        if (error) {
          reject(new Error(`Failed to get command '${id}': ${error.message}`));
        } else {
          resolve(response[0].length > 0 ? response[0][0] : null);
        }
      }
    );
  });

export default commandGetByID;
