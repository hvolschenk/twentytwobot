import { AxiosResponse } from 'axios';

import api from '../shared/api';
import { User } from '../types/User';

type UserJoinByUsernameOptions = Pick<User, 'username'>;

const userJoinByUsername = (options: UserJoinByUsernameOptions) =>
  api.post<void, AxiosResponse<void>>(
    `/user/username/${options.username}/join`
  );

export default userJoinByUsername;
