import { User } from './User';

export interface Points {
  dateUpdated: number;
  id: number;
  points: number;
  userID: User['id'];
}
