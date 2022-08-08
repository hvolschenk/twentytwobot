const tmi = require('tmi.js');

const configuration = require('../configuration');

let twitchClient;

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

module.exports = getTwitchClient;
