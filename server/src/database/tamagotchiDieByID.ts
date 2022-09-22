import mysql from 'mysql2';

import getDatabaseConnection from '../shared/getDatabaseConnection';
import { Tamagotchi } from '../types/Tamagotchi';

type TamagotchiDieByIDOptions = Pick<Tamagotchi, 'id'>;

const tamagotchiDieByID = ({ id }: TamagotchiDieByIDOptions) =>
  new Promise<void>((resolve, reject) => {
    const databaseConnection = getDatabaseConnection();
    databaseConnection.execute<mysql.ResultSetHeader>(
      { sql: 'CALL tamagotchi_die_by_id(?)', values: [id] },
      (error) => {
        if (error) {
          reject(new Error(`Tamagotchi ${id} failed to die: ${error.message}`));
        } else {
          resolve();
        }
      }
    );
  });

export default tamagotchiDieByID;
