import api from '../shared/api';
import { UserWithPoints } from '../types/UserWithPoints';

interface PointsGetTopOptions {
  count: number;
}

const pointsGetTop = (options: PointsGetTopOptions) =>
  api.get<UserWithPoints[]>(`/points/top/${options.count.toString()}`);

export default pointsGetTop;
