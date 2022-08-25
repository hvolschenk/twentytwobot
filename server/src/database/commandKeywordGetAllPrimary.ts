import { RowDataPacket } from 'mysql2';

import getDatabaseConnection from '../shared/getDatabaseConnection';
import { CommandKeyword } from '../types/CommandKeyword';

interface Keyword extends RowDataPacket {
  keyword: CommandKeyword['keyword'];
}

const commandKeywordGetAllPrimary = () =>
  new Promise<string[]>((resolve, reject) => {
    const databaseConnection = getDatabaseConnection();
    databaseConnection.execute<Keyword[][]>(
      { sql: 'CALL command_keyword_get_all_primary()', values: [] },
      (error, response) => {
        if (error) {
          reject(
            new Error(
              `Failed to get primary command keywords: ${error.message}`
            )
          );
        } else {
          resolve(response[0].map((commandKeyword) => commandKeyword.keyword));
        }
      }
    );
  });

export default commandKeywordGetAllPrimary;
