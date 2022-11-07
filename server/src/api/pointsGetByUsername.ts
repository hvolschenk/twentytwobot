import api from '../shared/api';
import { UserWithPoints } from '../types/UserWithPoints';

interface PointsGetByUsernameOptions {
  username: UserWithPoints['username'];
}

const pointsGetByUsername = (options: PointsGetByUsernameOptions) =>
  api.get<UserWithPoints>(`/points/user/${options.username}`);

export default pointsGetByUsername;
