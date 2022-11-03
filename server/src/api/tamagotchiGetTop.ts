import api from '../shared/api';
import { TamagotchiWithUser } from '../types/TamagotchiWithUser';

interface TamagotchiGetTopOptions {
  count: number;
}

const tamagotchiGetTop = (options: TamagotchiGetTopOptions) =>
  api.get<TamagotchiWithUser[]>(`/tamagotchi/top/${options.count}`);

export default tamagotchiGetTop;
