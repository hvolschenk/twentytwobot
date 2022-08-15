import getDatabaseConnection from '../shared/getDatabaseConnection';
import { Command } from '../types/Command';
import { CommandKeyword } from '../types/CommandKeyword';

type CommandKeywordGetAllByCommandIDOptions = Pick<Command, 'id'>;

const commandKeywordGetAllByCommandID = ({
  id,
}: CommandKeywordGetAllByCommandIDOptions) =>
  new Promise<CommandKeyword[]>((resolve, reject) => {
    const databaseConnection = getDatabaseConnection();
    databaseConnection.execute<CommandKeyword[][]>(
      'CALL command_keyword_get_all_by_command_id(?)',
      [id],
      (error, response) => {
        if (error) {
          reject(
            new Error(
              `Failed to get all keywords for command with ID '${id}': ${error.message}`
            )
          );
        } else {
          resolve(response[0] as CommandKeyword[]);
        }
      }
    );
  });

export default commandKeywordGetAllByCommandID;