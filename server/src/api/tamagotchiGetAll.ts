import api from '../shared/api';
import { TamagotchiWithUser } from '../types/TamagotchiWithUser';

const tamagotchiGetAll = () => api.get<TamagotchiWithUser[]>('/tamagotchi');

export default tamagotchiGetAll;
