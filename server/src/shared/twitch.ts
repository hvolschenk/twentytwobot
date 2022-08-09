import axios from 'axios';

import configuration from '../configuration';

const twitch = axios.create({
  baseURL: 'https://api.twitch.tv/helix',
  headers: {
    Authorization: `Bearer ${configuration.twitchTV.accessToken()}`,
    'Client-ID': configuration.twitchTV.clientID(),
  },
});

export default twitch;
