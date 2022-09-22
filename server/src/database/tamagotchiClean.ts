import mysql from 'mysql2';

import getDatabaseConnection from '../shared/getDatabaseConnection';
import { Tamagotchi } from '../types/Tamagotchi';
import { User } from '../types/User';

interface TamagotchiCleanOptions {
  clean: Tamagotchi['clean'];
  username: User['username'];
}

const tamagotchiClean = ({ clean, username }: TamagotchiCleanOptions) =>
  new Promise<void>((resolve, reject) => {
    const databaseConnection = getDatabaseConnection();
    databaseConnection.execute<mysql.ResultSetHeader>(
      { sql: 'CALL tamagotchi_clean(?, ?)', values: [username, clean] },
      (error) => {
        if (error) {
          reject(
            new Error(
              `Failed to clean tamagotchi for user ${username}: ${error.message}`
            )
          );
        } else {
          resolve();
        }
      }
    );
  });

export default tamagotchiClean;
