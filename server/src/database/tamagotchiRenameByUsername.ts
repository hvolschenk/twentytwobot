import mysql from 'mysql2';

import getDatabaseConnection from '../shared/getDatabaseConnection';
import { Tamagotchi } from '../types/Tamagotchi';
import { User } from '../types/User';

interface TamagotchiRenameByUsernameOptions {
  name: Tamagotchi['name'];
  username: User['username'];
}

const tamagotchiRenameByUsername = ({
  name,
  username,
}: TamagotchiRenameByUsernameOptions) =>
  new Promise<void>((resolve, reject) => {
    const databaseConnection = getDatabaseConnection();
    databaseConnection.execute<mysql.ResultSetHeader>(
      {
        sql: 'CALL tamagotchi_rename_by_username(?, ?)',
        values: [username, name],
      },
      (error) => {
        if (error) {
          reject(
            new Error(
              `Failed to change tamagotchi name for user ${username}: ${error.message}`
            )
          );
        } else {
          resolve();
        }
      }
    );
  });

export default tamagotchiRenameByUsername;
