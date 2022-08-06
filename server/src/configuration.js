const configuration = {
  mySQL: {
    database: () => process.env.MYSQL_DATABASE,
    host: () => process.env.MYSQL_HOST,
    password: () => process.env.MYSQL_PASSWORD,
    username: () => process.env.MYSQL_USER,
  },
  twitchTV: {
    accessToken: () => process.env.TWITCHTV_ACCESS_TOKEN,
    channels: () => process.env.TWITCHTV_CHANNELS,
    username: () => process.env.TWITCHTV_USERNAME,
  },
};

module.exports = configuration;
