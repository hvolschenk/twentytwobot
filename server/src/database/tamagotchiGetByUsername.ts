import getDatabaseConnection from '../shared/getDatabaseConnection';
import { TamagotchiWithUsername } from '../types/TamagotchiWithUsername';
import { User } from '../types/User';

type TamagotchiGetByUsernameOptions = Pick<User, 'username'>;

const tamagotchiGetByUsername = ({
  username,
}: TamagotchiGetByUsernameOptions) =>
  new Promise<TamagotchiWithUsername | null>((resolve, reject) => {
    const databaseConnection = getDatabaseConnection();
    databaseConnection.execute<TamagotchiWithUsername[][]>(
      { sql: 'CALL tamagotchi_get_by_username(?)', values: [username] },
      (error, response) => {
        if (error) {
          reject(new Error(`Failed to get tamagotchi for user @${username}`));
        } else {
          resolve(response[0].length > 0 ? response[0][0] : null);
        }
      }
    );
  });

export default tamagotchiGetByUsername;
