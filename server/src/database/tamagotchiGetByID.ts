import getDatabaseConnection from '../shared/getDatabaseConnection';
import { TamagotchiWithUsername } from '../types/TamagotchiWithUsername';

type TamagotchiGetByIDOptions = Pick<TamagotchiWithUsername, 'id'>;

const tamagotchiGetByID = ({ id }: TamagotchiGetByIDOptions) =>
  new Promise<TamagotchiWithUsername | null>((resolve, reject) => {
    const databaseConnection = getDatabaseConnection();
    databaseConnection.execute<TamagotchiWithUsername[][]>(
      { sql: 'CALL tamagotchi_get_by_id(?)', values: [id] },
      (error, response) => {
        if (error) {
          reject(new Error(`Failed to get tamagotchi ${id}: ${error.message}`));
        } else {
          resolve(response[0].length > 0 ? response[0][0] : null);
        }
      }
    );
  });

export default tamagotchiGetByID;
