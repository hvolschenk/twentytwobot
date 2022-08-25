import { Points } from './Points';
import { User } from './User';

export interface PointsWithUser extends Points {
  displayName: User['displayName'];
  username: User['username'];
}
