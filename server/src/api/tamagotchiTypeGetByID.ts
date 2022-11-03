import api from '../shared/api';
import { TamagotchiType } from '../types/TamagotchiType';

interface TamagotchiTypeGetByIDOptions {
  id: number;
}

const tamagotchiTypeGetByID = (options: TamagotchiTypeGetByIDOptions) =>
  api.get<TamagotchiType>(`/tamagotchi-type/${options.id}`);

export default tamagotchiTypeGetByID;
