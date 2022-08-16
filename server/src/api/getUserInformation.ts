import twitch from 'shared/twitch';
import { User } from 'types/User';

// https://dev.twitch.tv/docs/api/reference#get-users
interface HelixUser {
  broadcaster_type: string;
  created_at: string;
  description: string;
  display_name: string;
  email?: string;
  id: string;
  login: string;
  offline_image_url: string;
  profile_image_url: string;
  type: 'admin' | 'global_mod' | 'staff' | '';
}

const getUserInformation = (username: User['username']) =>
  twitch
    .get<{ data: HelixUser[] }>(`/users?login=${username}`)
    .then((response) => response.data.data[0]);

export default getUserInformation;
