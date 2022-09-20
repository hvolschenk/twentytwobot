import getDatabaseConnection from '../shared/getDatabaseConnection';
import { TamagotchiWithUsername } from '../types/TamagotchiWithUsername';

interface TamagotchiGetForEntertainmentLossOptions {
  timeMinutes: number;
}

const tamagotchiGetForEntertainmentLoss = ({
  timeMinutes,
}: TamagotchiGetForEntertainmentLossOptions) =>
  new Promise<TamagotchiWithUsername[]>((resolve, reject) => {
    const databaseConnection = getDatabaseConnection();
    databaseConnection.execute<TamagotchiWithUsername[][]>(
      {
        sql: 'CALL tamagotchi_get_for_entertainment_loss(?)',
        values: [timeMinutes],
      },
      (error, response) => {
        if (error) {
          reject(
            new Error(
              `Failed to get tamagotchis for entertainment loss: ${error.message}`
            )
          );
        } else {
          resolve(response[0]);
        }
      }
    );
  });

export default tamagotchiGetForEntertainmentLoss;
