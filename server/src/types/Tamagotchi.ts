import { RowDataPacket } from 'mysql2';

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
  tamagotchiTypeID: number;
  userID: number;
}
