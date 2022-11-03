import api from '../shared/api';
import { Tamagotchi } from '../types/Tamagotchi';

interface TamagotchiDieOptions {
  id: Tamagotchi['id'];
}

const tamagotchiDie = (options: TamagotchiDieOptions) =>
  api.delete<void>(`/tamagotchi/${options.id}`);

export default tamagotchiDie;
