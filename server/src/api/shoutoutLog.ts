import { AxiosResponse } from 'axios';

import api from '../shared/api';
import { User } from '../types/User';

interface ShoutoutLogOptions {
  usernameFrom: User['username'];
  usernameTo: User['username'];
}

const shoutoutLog = (options: ShoutoutLogOptions) =>
  api.post<void, AxiosResponse<void>, ShoutoutLogOptions>(
    '/shoutout/log',
    options
  );

export default shoutoutLog;
