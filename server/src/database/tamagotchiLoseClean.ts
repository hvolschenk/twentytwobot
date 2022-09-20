import mysql from 'mysql2';

import getDatabaseConnection from '../shared/getDatabaseConnection';
import { Tamagotchi } from '../types/Tamagotchi';

type TamagotchiLoseCleanOptions = Pick<Tamagotchi, 'clean' | 'id'>;

const tamagotchiLoseClean = ({ clean, id }: TamagotchiLoseCleanOptions) =>
  new Promise<void>((resolve, reject) => {
    const databaseConnection = getDatabaseConnection();
    databaseConnection.execute<mysql.ResultSetHeader>(
      { sql: 'CALL tamagotchi_lose_clean(?, ?)', values: [id, clean] },
      (error) => {
        if (error) {
          reject(
            new Error(
              `Failed to lose clean for tamagotchi ${id}: ${error.message}`
            )
          );
        } else {
          resolve();
        }
      }
    );
  });

export default tamagotchiLoseClean;
