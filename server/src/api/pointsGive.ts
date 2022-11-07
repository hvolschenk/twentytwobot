import { AxiosResponse } from 'axios';

import api from '../shared/api';
import { User } from '../types/User';

interface PointsGiveOptions {
  from: User['username'];
  points: number;
  to: User['username'];
}

const pointsGive = (options: PointsGiveOptions) =>
  api.post<void, AxiosResponse<void>, PointsGiveOptions>(
    '/points/give',
    options
  );

export default pointsGive;
