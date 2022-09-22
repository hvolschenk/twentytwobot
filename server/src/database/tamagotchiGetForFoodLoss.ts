import getDatabaseConnection from '../shared/getDatabaseConnection';
import { TamagotchiWithUsername } from '../types/TamagotchiWithUsername';

interface TamagotchiGetForFoodLossOptions {
  timeMinutes: number;
}

const tamagotchiGetForFoodLoss = ({
  timeMinutes,
}: TamagotchiGetForFoodLossOptions) =>
  new Promise<TamagotchiWithUsername[]>((resolve, reject) => {
    const databaseConnection = getDatabaseConnection();
    databaseConnection.execute<TamagotchiWithUsername[][]>(
      {
        sql: 'CALL tamagotchi_get_for_food_loss(?)',
        values: [timeMinutes],
      },
      (error, response) => {
        if (error) {
          reject(
            new Error(
              `Failed to get tamagotchis for food loss: ${error.message}`
            )
          );
        } else {
          resolve(response[0]);
        }
      }
    );
  });

export default tamagotchiGetForFoodLoss;
