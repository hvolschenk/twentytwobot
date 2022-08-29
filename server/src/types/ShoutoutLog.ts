import { RowDataPacket } from 'mysql2';

import { User } from './User';

export interface ShoutoutLog extends RowDataPacket {
  dateShouted: number;
  id: number;
  usernameFrom: User['username'];
  usernameTo: User['username'];
}
