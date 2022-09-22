import { RowDataPacket } from 'mysql2';

export interface TamagotchiType extends RowDataPacket {
  display: string;
  id: number;
  type: string;
}
