import mysql from 'mysql2';

import getDatabaseConnection from '../../shared/database';
import { Command } from '../../types/Command';
import { User } from '../../types/User';

interface CommandLogCreateOptions {
  commandID: Command['id'];
  username: User['username'];
}

const commandLogCreate = ({ commandID, username }: CommandLogCreateOptions) =>
  new Promise<number>((resolve, reject) => {
    const databaseConnection = getDatabaseConnection();
    databaseConnection.execute<mysql.ResultSetHeader>(
      { sql: 'CALL command_log_create(?, ?)', values: [commandID, username] },
      (error, result) => {
        if (error) {
          reject(
            new Error(
              `Failed to log the command being called: ${error.message}`
            )
          );
        } else {
          resolve(result.insertId);
        }
      }
    );
  });

export default commandLogCreate;
