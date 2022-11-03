import { AxiosResponse } from 'axios';

import api from '../shared/api';
import { User } from '../types/User';

type UserUpdateOptions = Pick<
  User,
  'displayName' | 'id' | 'lastGamePlayed' | 'twitchID'
>;

type UserUpdateData = Omit<UserUpdateOptions, 'id'>;

const userUpdate = (options: UserUpdateOptions) => {
  const data = {
    displayName: options.displayName,
    lastGamePlayed: options.lastGamePlayed,
    twitchID: options.twitchID,
  };
  return api.put<void, AxiosResponse<void>, UserUpdateData>(
    `/user/${options.id}`,
    data
  );
};

export default userUpdate;
