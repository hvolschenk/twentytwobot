import { AxiosResponse } from 'axios';

import api from '../shared/api';
import { User } from '../types/User';

interface PointsRemoveOptions {
  points: number;
  username: User['username'];
}

const pointsRemove = (options: PointsRemoveOptions) =>
  api.post<void, AxiosResponse<void>, PointsRemoveOptions>(
    '/points/remove',
    options
  );

export default pointsRemove;
