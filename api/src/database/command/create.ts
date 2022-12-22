import mysql from 'mysql2';

import getDatabaseConnection from '../../shared/database';
import { Command } from '../../types/Command';

type CommandCreateOptions = Pick<Command, 'command' | 'description' | 'name'>;

const commandCreate = ({ command, description, name }: CommandCreateOptions) =>
  new Promise<number>((resolve, reject) => {
    const databaseConnection = getDatabaseConnection();
    databaseConnection.execute<mysql.ResultSetHeader>(
      {
        sql: 'CALL command_create(?, ?, ?)',
        values: [name, command, description],
      },
      (error, result) => {
        if (error) {
          reject(new Error(`Failed to create the command: ${error.message}`));
        } else {
          resolve(result.insertId);
        }
      }
    );
  });

export default commandCreate;
