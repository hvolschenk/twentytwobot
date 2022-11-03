import getDatabaseConnection from '../../shared/database';
import { Tamagotchi } from '../../types/Tamagotchi';

const tamagotchiGetAll = () =>
  new Promise<Tamagotchi[]>((resolve, reject) => {
    const databaseConnection = getDatabaseConnection();
    databaseConnection.execute<Tamagotchi[][]>(
      { sql: 'CALL tamagotchi_get_all()', values: [] },
      (error, response) => {
        if (error) {
          reject(new Error(`Failed to get all tamagotchis: ${error.message}`));
        } else {
          resolve(response[0]);
        }
      }
    );
  });

export default tamagotchiGetAll;
