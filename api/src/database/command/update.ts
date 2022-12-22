import mysql from 'mysql2';

import getDatabaseConnection from '../../shared/database';
import { Command } from '../../types/Command';

type CommandUpdateOptions = Pick<
  Command,
  'command' | 'description' | 'id' | 'name'
>;

const commandUpdate = ({
  command,
  description,
  id,
  name,
}: CommandUpdateOptions) =>
  new Promise<void>((resolve, reject) => {
    const databaseConnection = getDatabaseConnection();
    databaseConnection.execute<mysql.ResultSetHeader>(
      {
        sql: 'CALL command_update(?, ?, ?, ?)',
        values: [id, name, command, description],
      },
      (error) => {
        if (error) {
          reject(new Error(`Failed to update command ${id}: ${error.message}`));
        } else {
          resolve();
        }
      }
    );
  });

export default commandUpdate;
