import mysql from 'mysql2';

import getDatabaseConnection from '../../shared/database';
import { Command } from '../../types/Command';

type CommandDeleteOptions = Pick<Command, 'id'>;

const commandDelete = ({ id }: CommandDeleteOptions) =>
  new Promise<void>((resolve, reject) => {
    const databaseConnection = getDatabaseConnection();
    databaseConnection.execute<mysql.ResultSetHeader>(
      {
        sql: 'CALL command_delete(?)',
        values: [id],
      },
      (error) => {
        if (error) {
          reject(new Error(`Failed to delete command ${id}: ${error.message}`));
        } else {
          resolve();
        }
      }
    );
  });

export default commandDelete;
