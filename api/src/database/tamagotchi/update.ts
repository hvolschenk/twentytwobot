import mysql from 'mysql2';

import getDatabaseConnection from '../../shared/database';
import { Tamagotchi } from '../../types/Tamagotchi';

type TamagotchiUpdateOptions = Pick<Tamagotchi, 'id' | 'name'>;

const tamagotchiUpdate = ({ id, name }: TamagotchiUpdateOptions) =>
  new Promise<void>((resolve, reject) => {
    const databaseConnection = getDatabaseConnection();
    databaseConnection.execute<mysql.ResultSetHeader>(
      {
        sql: 'CALL tamagotchi_update(?, ?)',
        values: [id, name],
      },
      (error) => {
        if (error) {
          reject(
            new Error(`Failed to update tamagotchi '${id}': ${error.message}`)
          );
        } else {
          resolve();
        }
      }
    );
  });

export default tamagotchiUpdate;
