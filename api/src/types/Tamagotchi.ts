import { RowDataPacket } from 'mysql2';

import { TamagotchiType } from './TamagotchiType';
import { User } from './User';

export interface Tamagotchi extends RowDataPacket {
  clean: number;
  dateCreated: number;
  dateDied: number | null;
  dateLossClean: number;
  dateLossEntertainment: number;
  dateLossFood: number;
  entertainment: number;
  food: number;
  id: number;
  isAlive: boolean;
  name: string;
  tamagotchiTypeID: TamagotchiType['id'];
  userID: User['id'];
}
