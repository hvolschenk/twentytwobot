import { Tamagotchi } from './Tamagotchi';
import { User } from './User';

export interface TamagotchiWithUser extends Tamagotchi {
  user: User;
}
