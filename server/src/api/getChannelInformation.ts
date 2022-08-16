import twitch from '../shared/twitch';
import { User } from '../types/User';

// https://dev.twitch.tv/docs/api/reference#get-channel-information
interface HelixChannel {
  broadcaster_id: string;
  broadcaster_language: string;
  broadcaster_login: string;
  broadcaster_name: string;
  delay: number;
  game_id: string;
  game_name: string;
  title: string;
}

const getChannelInformation = (userID: User['twitchID']) =>
  twitch
    .get<{ data: HelixChannel[] }>(`/channels?broadcaster_id=${userID}`)
    .then((response) => response.data.data[0]);

export default getChannelInformation;
