import getDatabaseConnection from '../../shared/database';
import { Tamagotchi } from '../../types/Tamagotchi';

interface TamagotchiGetTopOptions {
  count?: number;
}

const tamagotchiGetTop = ({ count = 10 }: TamagotchiGetTopOptions) =>
  new Promise<Tamagotchi[]>((resolve, reject) => {
    const databaseConnection = getDatabaseConnection();
    databaseConnection.execute<Tamagotchi[][]>(
      { sql: 'CALL tamagotchi_get_top(?)', values: [count] },
      (error, response) => {
        if (error) {
          reject(new Error(`Failed to get top ${count} tamagotchis`));
        } else {
          resolve(response[0]);
        }
      }
    );
  });

export default tamagotchiGetTop;
