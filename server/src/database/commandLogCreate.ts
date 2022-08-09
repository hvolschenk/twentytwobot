import mysql from 'mysql2';

import getDatabaseConnection from '../shared/getDatabaseConnection';
import { Command } from '../types/Command';
import { User } from '../types/User';

interface CommandLogCreateOptions {
  commandName: Command['name'];
  username: User['username'];
}

const commandLogCreate = ({ commandName, username }: CommandLogCreateOptions) =>
  new Promise<number>((resolve, reject) => {
    const databaseConnection = getDatabaseConnection();
    databaseConnection.execute<mysql.ResultSetHeader>(
      'CALL command_log_create(?, ?)',
      [commandName, username],
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
