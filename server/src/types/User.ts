import { RowDataPacket } from 'mysql2';

export interface User extends RowDataPacket {
  dateCreated: number;
  dateUpdated: number;
  displayName: string;
  id: number;
  lastGamePlayed: string;
  twitchID: string;
  username: string;
}
