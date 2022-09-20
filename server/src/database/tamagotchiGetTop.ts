import getDatabaseConnection from '../shared/getDatabaseConnection';
import { TamagotchiWithUsername } from '../types/TamagotchiWithUsername';

interface TamagotchiGetTopOptions {
  count?: number;
}

const tamagotchiGetTop = ({ count = 10 }: TamagotchiGetTopOptions) =>
  new Promise<TamagotchiWithUsername[]>((resolve, reject) => {
    const databaseConnection = getDatabaseConnection();
    databaseConnection.execute<TamagotchiWithUsername[][]>(
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
