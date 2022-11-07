import { AxiosResponse } from 'axios';

import api from '../shared/api';
import { User } from '../types/User';

type UserCreateOptions = Pick<
  User,
  'displayName' | 'isBot' | 'lastGamePlayed' | 'twitchID' | 'username'
>;

const userCreate = (options: UserCreateOptions) =>
  api.post<void, AxiosResponse<void>, UserCreateOptions>('/user', options);

export default userCreate;
