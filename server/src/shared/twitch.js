const axios = require('axios');

const configuration = require('../configuration');

const twitch = axios.create({
  baseURL: 'https://api.twitch.tv/helix',
  headers: {
    Authorization: `Bearer ${configuration.twitchTV.accessToken()}`,
    'Client-ID': configuration.twitchTV.clientID(),
  },
});

module.exports = twitch;
