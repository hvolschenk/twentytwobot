import { Points } from './Points';
import { User } from './User';

export interface UserWithPoints extends User {
  points: Points;
}
