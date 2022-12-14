import { RowDataPacket } from 'mysql2';

import getDatabaseConnection from '../../shared/database';
import { CommandKeyword } from '../../types/CommandKeyword';

interface CommandGetInvocationsCountOptions {
  keyword: CommandKeyword['keyword'];
}

interface InvocationsCountCount extends RowDataPacket {
  count: number;
}

const commandGetInvocationsCount = ({
  keyword,
}: CommandGetInvocationsCountOptions) =>
  new Promise<number>((resolve, reject) => {
    const databaseConnection = getDatabaseConnection();
    databaseConnection.execute<InvocationsCountCount[][]>(
      { sql: 'CALL command_get_invocations_count(?)', values: [keyword] },
      (error, response) => {
        if (error) {
          reject(
            new Error(`Failed to command onvocations count: ${error.message}`)
          );
        } else {
          const { count } = response[0][0];
          resolve(count as number);
        }
      }
    );
  });

export default commandGetInvocationsCount;
