import getDatabaseConnection from '../../shared/database';
import { Command } from '../../types/Command';
import { CommandKeyword } from '../../types/CommandKeyword';

type CommandGetByKeywordOptions = Pick<CommandKeyword, 'keyword'>;

const commandGetByKeyword = ({ keyword }: CommandGetByKeywordOptions) =>
  new Promise<Command | null>((resolve, reject) => {
    const databaseConnection = getDatabaseConnection();
    databaseConnection.execute<Command[][]>(
      { sql: 'CALL command_get_by_keyword(?)', values: [keyword] },
      (error, response) => {
        if (error) {
          reject(
            new Error(
              `Failed to get command by keyword '${keyword}': ${error.message}`
            )
          );
        } else {
          resolve(response[0].length > 0 ? (response[0][0] as Command) : null);
        }
      }
    );
  });

export default commandGetByKeyword;
