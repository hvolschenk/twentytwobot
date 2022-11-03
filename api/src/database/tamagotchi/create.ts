import mysql from 'mysql2';

import getDatabaseConnection from '../../shared/database';
import { User } from '../../types/User';

type TamagotchiCreateOptions = Pick<User, 'username'>;

const tamagotchiCreate = ({ username }: TamagotchiCreateOptions) =>
  new Promise<number>((resolve, reject) => {
    const databaseConnection = getDatabaseConnection();
    databaseConnection.execute<mysql.ResultSetHeader>(
      {
        sql: 'CALL tamagotchi_create(?)',
        values: [username],
      },
      (error, result) => {
        if (error) {
          reject(
            new Error(
              `Failed to create the tamagotchi for ${username}: ${error.message}`
            )
          );
        } else {
          resolve(result.insertId);
        }
      }
    );
  });

export default tamagotchiCreate;
