import mysql from 'mysql2';

import getDatabaseConnection from '../../shared/database';
import { Tamagotchi } from '../../types/Tamagotchi';

interface TamagotchiCareOptions {
  clean: Tamagotchi['clean'] | null;
  entertainment: Tamagotchi['entertainment'] | null;
  food: Tamagotchi['food'] | null;
  id: Tamagotchi['id'];
}

const tamagotchiCare = ({
  clean,
  entertainment,
  food,
  id,
}: TamagotchiCareOptions) =>
  new Promise<void>((resolve, reject) => {
    const databaseConnection = getDatabaseConnection();
    databaseConnection.execute<mysql.ResultSetHeader>(
      {
        sql: 'CALL tamagotchi_care(?, ?, ?, ?)',
        values: [id, clean, entertainment, food],
      },
      (error) => {
        if (error) {
          reject(
            new Error(
              `Failed to care for tamagotchi @${id}: ${
                (error as Error).message
              }`
            )
          );
        } else {
          resolve();
        }
      }
    );
  });

export default tamagotchiCare;
