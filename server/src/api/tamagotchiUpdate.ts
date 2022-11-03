import { AxiosResponse } from 'axios';

import api from '../shared/api';
import { Tamagotchi } from '../types/Tamagotchi';

type TamagotchiUpdateOptions = Pick<Tamagotchi, 'id' | 'name'>;

type TamagotchiUpdateData = Omit<TamagotchiUpdateOptions, 'id'>;

const tamagotchiUpdate = (options: TamagotchiUpdateOptions) => {
  const data = { name: options.name };
  return api.put<void, AxiosResponse<void>, TamagotchiUpdateData>(
    `/tamagotchi/${options.id}`,
    data
  );
};

export default tamagotchiUpdate;
