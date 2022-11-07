import api from '../shared/api';
import { TamagotchiWithUser } from '../types/TamagotchiWithUser';
import { User } from '../types/User';

interface TamagotchiGetByUsernameOptions {
  username: User['username'];
}

const tamagotchiGetByUsername = (options: TamagotchiGetByUsernameOptions) =>
  api.get<TamagotchiWithUser>(`/tamagotchi/username/${options.username}`);

export default tamagotchiGetByUsername;
