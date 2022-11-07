import { User } from './User';

export interface ShoutoutLog {
  dateShouted: number;
  id: number;
  usernameFrom: User['username'];
  usernameTo: User['username'];
}
