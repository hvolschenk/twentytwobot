import { AxiosResponse } from 'axios';

import api from '../shared/api';
import { User } from '../types/User';

type TamagotchiCreateOptions = Pick<User, 'username'>;

const tamagotchiCreate = (options: TamagotchiCreateOptions) =>
  api.post<void, AxiosResponse<void>, TamagotchiCreateOptions>(
    '/tamagotchi',
    options
  );

export default tamagotchiCreate;
