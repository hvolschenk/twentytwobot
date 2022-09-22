import getDatabaseConnection from '../shared/getDatabaseConnection';
import { TamagotchiWithUsername } from '../types/TamagotchiWithUsername';

interface TamagotchiGetForCleanLossOptions {
  timeMinutes: number;
}

const tamagotchiGetForCleanLoss = ({
  timeMinutes,
}: TamagotchiGetForCleanLossOptions) =>
  new Promise<TamagotchiWithUsername[]>((resolve, reject) => {
    const databaseConnection = getDatabaseConnection();
    databaseConnection.execute<TamagotchiWithUsername[][]>(
      { sql: 'CALL tamagotchi_get_for_clean_loss(?)', values: [timeMinutes] },
      (error, response) => {
        if (error) {
          reject(
            new Error(
              `Failed to get tamagotchis for clean loss: ${error.message}`
            )
          );
        } else {
          resolve(response[0]);
        }
      }
    );
  });

export default tamagotchiGetForCleanLoss;
