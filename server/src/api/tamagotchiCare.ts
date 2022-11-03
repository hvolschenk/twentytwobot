import { AxiosResponse } from 'axios';

import api from '../shared/api';
import { Tamagotchi } from '../types/Tamagotchi';

interface TamagotchiCareOptions {
  clean?: Tamagotchi['clean'];
  entertainment?: Tamagotchi['entertainment'];
  food?: Tamagotchi['food'];
  id: Tamagotchi['id'];
}

type TamagotchiCareData = Pick<
  TamagotchiCareOptions,
  'clean' | 'entertainment' | 'food'
>;

const tamagotchiCare = (options: TamagotchiCareOptions) => {
  const data = (Object.keys(options) as (keyof typeof options)[])
    .map((key) => [key, options[key]])
    .filter(([, value]) => value !== undefined)
    .filter((filterOption) =>
      ['clean', 'entertainment', 'food'].includes(filterOption[0] as string)
    )
    .reduce(
      (accumulator, [key, value]) => ({
        ...accumulator,
        [key as string]: value,
      }),
      {}
    );
  return api.post<void, AxiosResponse<void>, TamagotchiCareData>(
    `/tamagotchi/${options.id}/care`,
    data
  );
};

export default tamagotchiCare;
