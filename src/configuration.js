const configuration = {
  twitchTV: {
    authenticationToken: () => process.env.TWITCHTV_AUTHENTICATION_TOKEN,
    channels: () => process.env.TWITCHTV_CHANNELS,
    username: () => process.env.TWITCHTV_USERNAME,
  },
};

module.exports = configuration;
