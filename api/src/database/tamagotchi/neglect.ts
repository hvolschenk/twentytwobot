import mysql from 'mysql2';

import getDatabaseConnection from '../../shared/database';
import { Tamagotchi } from '../../types/Tamagotchi';

interface TamagotchiNeglectOptions {
  clean: Tamagotchi['clean'] | null;
  entertainment: Tamagotchi['entertainment'] | null;
  food: Tamagotchi['food'] | null;
  id: Tamagotchi['id'];
}

const tamagotchiNeglect = ({
  clean,
  entertainment,
  food,
  id,
}: TamagotchiNeglectOptions) =>
  new Promise<void>((resolve, reject) => {
    const databaseConnection = getDatabaseConnection();
    databaseConnection.execute<mysql.ResultSetHeader>(
      {
        sql: 'CALL tamagotchi_neglect(?, ?, ?, ?)',
        values: [id, clean, entertainment, food],
      },
      (error) => {
        if (error) {
          reject(
            new Error(
              `Failed to neglect tamagotchi @${id}: ${(error as Error).message}`
            )
          );
        } else {
          resolve();
        }
      }
    );
  });

export default tamagotchiNeglect;
