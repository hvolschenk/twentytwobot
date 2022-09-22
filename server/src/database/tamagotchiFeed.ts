import mysql from 'mysql2';

import getDatabaseConnection from '../shared/getDatabaseConnection';
import { Tamagotchi } from '../types/Tamagotchi';
import { User } from '../types/User';

interface TamagotchiFeedOptions {
  food: Tamagotchi['food'];
  username: User['username'];
}

const tamagotchiFeed = ({ food, username }: TamagotchiFeedOptions) =>
  new Promise<void>((resolve, reject) => {
    const databaseConnection = getDatabaseConnection();
    databaseConnection.execute<mysql.ResultSetHeader>(
      { sql: 'CALL tamagotchi_feed(?, ?)', values: [username, food] },
      (error) => {
        if (error) {
          reject(
            new Error(
              `Failed to feed tamagotchi for user ${username}: ${error.message}`
            )
          );
        } else {
          resolve();
        }
      }
    );
  });

export default tamagotchiFeed;
