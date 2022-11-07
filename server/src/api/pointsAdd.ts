import { AxiosResponse } from 'axios';

import api from '../shared/api';
import { User } from '../types/User';

interface PointsAddOptions {
  points: number;
  username: User['username'];
}

const pointsAdd = (options: PointsAddOptions) =>
  api.post<void, AxiosResponse<void>, PointsAddOptions>('/points/add', options);

export default pointsAdd;
