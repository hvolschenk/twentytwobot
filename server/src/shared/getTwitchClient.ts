import tmi from 'tmi.js';

import configuration from '../configuration';

let twitchClient: tmi.Client;

const getTwitchClient = () => {
  if (!twitchClient) {
    twitchClient = new tmi.Client({
      options: { debug: true },
      identity: {
        username: configuration.twitchTV.username(),
        password: `oauth:${configuration.twitchTV.accessToken()}`,
      },
      channels: configuration.twitchTV.channels().split(','),
    });
  }
  return twitchClient;
};

export default getTwitchClient;
