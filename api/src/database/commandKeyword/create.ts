import mysql from 'mysql2';

import getDatabaseConnection from '../../shared/database';
import { CommandKeyword } from '../../types/CommandKeyword';

type CommandKeywordCreateOptions = Pick<
  CommandKeyword,
  'commandID' | 'isPrimary' | 'keyword'
>;

const commandKeywordCreate = ({
  commandID,
  isPrimary,
  keyword,
}: CommandKeywordCreateOptions) =>
  new Promise<number>((resolve, reject) => {
    const databaseConnection = getDatabaseConnection();
    databaseConnection.execute<mysql.ResultSetHeader>(
      {
        sql: 'CALL command_keyword_create(?, ?, ?)',
        values: [keyword, commandID, isPrimary],
      },
      (error, result) => {
        if (error) {
          reject(
            new Error(`Failed to create the command keyword: ${error.message}`)
          );
        } else {
          resolve(result.insertId);
        }
      }
    );
  });

export default commandKeywordCreate;
