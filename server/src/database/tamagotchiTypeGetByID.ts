import getDatabaseConnection from '../shared/getDatabaseConnection';
import { TamagotchiType } from '../types/TamagotchiType';

type TamagotchiTypeGetByIDOptions = Pick<TamagotchiType, 'id'>;

const tamagotchiTypeGetByID = ({ id }: TamagotchiTypeGetByIDOptions) =>
  new Promise<TamagotchiType | null>((resolve, reject) => {
    const databaseConnection = getDatabaseConnection();
    databaseConnection.execute<TamagotchiType[][]>(
      { sql: 'CALL tamagotchi_type_get_by_id(?)', values: [id] },
      (error, response) => {
        if (error) {
          reject(
            new Error(`Failed to get tamagotchi type ${id}: ${error.message}`)
          );
        } else {
          resolve(response[0].length > 0 ? response[0][0] : null);
        }
      }
    );
  });

export default tamagotchiTypeGetByID;
