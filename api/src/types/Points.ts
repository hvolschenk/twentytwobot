import { RowDataPacket } from 'mysql2';

import { User } from './User';

export interface Points extends RowDataPacket {
  dateUpdated: number;
  id: number;
  points: number;
  userID: User['id'];
}
