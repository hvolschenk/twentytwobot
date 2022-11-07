import { AxiosResponse } from 'axios';

import api from '../shared/api';
import { User } from '../types/User';

type UserPartByUsernameOptions = Pick<User, 'username'>;

const userPartByUsername = (options: UserPartByUsernameOptions) =>
  api.post<void, AxiosResponse<void>>(
    `/user/username/${options.username}/part`
  );

export default userPartByUsername;
