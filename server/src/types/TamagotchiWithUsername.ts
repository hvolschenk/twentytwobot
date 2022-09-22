import { Tamagotchi } from './Tamagotchi';
import { User } from './User';

export interface TamagotchiWithUsername extends Tamagotchi {
  displayName: User['displayName'];
  username: User['username'];
}
