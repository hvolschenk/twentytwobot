import { AxiosResponse } from 'axios';

import api from '../shared/api';
import { Tamagotchi } from '../types/Tamagotchi';

interface TamagotchiNeglectOptions {
  clean?: Tamagotchi['clean'];
  entertainment?: Tamagotchi['entertainment'];
  food?: Tamagotchi['food'];
  id: Tamagotchi['id'];
}

type TamagotchiNeglectData = Pick<
  TamagotchiNeglectOptions,
  'clean' | 'entertainment' | 'food'
>;

const tamagotchiNeglect = (options: TamagotchiNeglectOptions) => {
  const data = (Object.keys(options) as (keyof typeof options)[])
    .map((key) => [key, options[key]])
    .filter(([, value]) => value !== undefined)
    .filter(([key]) =>
      ['clean', 'entertainment', 'food'].includes(key as string)
    )
    .reduce(
      (accumulator, [key, value]) => ({
        ...accumulator,
        [key as string]: value,
      }),
      {}
    );
  return api.post<void, AxiosResponse<void>, TamagotchiNeglectData>(
    `/tamagotchi/${options.id}/neglect`,
    data
  );
};

export default tamagotchiNeglect;
