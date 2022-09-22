import mysql from 'mysql2';

import getDatabaseConnection from '../shared/getDatabaseConnection';
import { Tamagotchi } from '../types/Tamagotchi';

type TamagotchiLoseFoodOptions = Pick<Tamagotchi, 'food' | 'id'>;

const tamagotchiLoseFood = ({ food, id }: TamagotchiLoseFoodOptions) =>
  new Promise<void>((resolve, reject) => {
    const databaseConnection = getDatabaseConnection();
    databaseConnection.execute<mysql.ResultSetHeader>(
      { sql: 'CALL tamagotchi_lose_food(?, ?)', values: [id, food] },
      (error) => {
        if (error) {
          reject(
            new Error(
              `Failed to lose food for tamagotchi ${id}: ${error.message}`
            )
          );
        } else {
          resolve();
        }
      }
    );
  });

export default tamagotchiLoseFood;
