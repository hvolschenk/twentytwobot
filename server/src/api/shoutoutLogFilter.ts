import api from '../shared/api';
import { ShoutoutLog } from '../types/ShoutoutLog';
import { User } from '../types/User';

interface ShoutoutLogFilterOptions {
  count: number;
  usernameFrom?: User['username'];
  usernameTo: User['username'];
}

const shoutoutLogFilter = (options: ShoutoutLogFilterOptions) => {
  const filteredOptions = (Object.keys(options) as (keyof typeof options)[])
    .map((key) => [key, options[key]?.toString()])
    .filter(([, value]) => value !== undefined) as string[][];
  const searchParams = new URLSearchParams(filteredOptions);
  return api.get<ShoutoutLog[]>(
    `/shoutout/log/filter?${searchParams.toString()}`
  );
};

export default shoutoutLogFilter;
