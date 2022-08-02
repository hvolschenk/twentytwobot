const configuration = {
  twitchTV: {
    accessToken: () => process.env.TWITCHTV_ACCESS_TOKEN,
    channels: () => process.env.TWITCHTV_CHANNELS,
    username: () => process.env.TWITCHTV_USERNAME,
  },
};

module.exports = configuration;
