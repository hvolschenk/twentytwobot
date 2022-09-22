import mysql from 'mysql2';

import getDatabaseConnection from '../shared/getDatabaseConnection';
import { Tamagotchi } from '../types/Tamagotchi';

type TamagotchiLoseEntertainmentOptions = Pick<
  Tamagotchi,
  'entertainment' | 'id'
>;

const tamagotchiLoseEntertainment = ({
  entertainment,
  id,
}: TamagotchiLoseEntertainmentOptions) =>
  new Promise<void>((resolve, reject) => {
    const databaseConnection = getDatabaseConnection();
    databaseConnection.execute<mysql.ResultSetHeader>(
      {
        sql: 'CALL tamagotchi_lose_entertainment(?, ?)',
        values: [id, entertainment],
      },
      (error) => {
        if (error) {
          reject(
            new Error(
              `Failed to lose entertainment for tamagotchi ${id}: ${error.message}`
            )
          );
        } else {
          resolve();
        }
      }
    );
  });

export default tamagotchiLoseEntertainment;
