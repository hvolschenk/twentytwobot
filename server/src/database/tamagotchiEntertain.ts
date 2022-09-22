import mysql from 'mysql2';

import getDatabaseConnection from '../shared/getDatabaseConnection';
import { Tamagotchi } from '../types/Tamagotchi';
import { User } from '../types/User';

interface TamagotchiEntertainOptions {
  entertainment: Tamagotchi['entertainment'];
  username: User['username'];
}

const tamagotchiEntertain = ({
  entertainment,
  username,
}: TamagotchiEntertainOptions) =>
  new Promise<void>((resolve, reject) => {
    const databaseConnection = getDatabaseConnection();
    databaseConnection.execute<mysql.ResultSetHeader>(
      {
        sql: 'CALL tamagotchi_entertain(?, ?)',
        values: [username, entertainment],
      },
      (error) => {
        if (error) {
          reject(
            new Error(
              `Failed to entertain tamagotchi for user ${username}: ${error.message}`
            )
          );
        } else {
          resolve();
        }
      }
    );
  });

export default tamagotchiEntertain;
