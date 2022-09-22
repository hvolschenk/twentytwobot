import getDatabaseConnection from '../shared/getDatabaseConnection';
import { User } from '../types/User';

type UserGetByIDOptions = Pick<User, 'id'>;

const userGetByID = ({ id }: UserGetByIDOptions) =>
  new Promise<User | null>((resolve, reject) => {
    const databaseConnection = getDatabaseConnection();

    databaseConnection.execute<User[][]>(
      { sql: 'CALL user_get_by_id(?)', values: [id] },
      (error, response) => {
        if (error) {
          reject(new Error(`Failed to get user '${id}': ${error.message}`));
        } else {
          resolve(response[0].length > 0 ? response[0][0] : null);
        }
      }
    );
  });

export default userGetByID;
