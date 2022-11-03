import api from '../shared/api';
import { User } from '../types/User';

interface UserGetByUsernameOptions {
  username: User['username'];
}

const userGetByUsername = (options: UserGetByUsernameOptions) =>
  api.get<User>(`/user/username/${options.username}`);

export default userGetByUsername;
