interface Configuration {
  mySQL: {
    database(): string;
    host(): string;
    password(): string;
    username(): string;
  };
  twitchTV: {
    accessToken(): string;
    channels(): string;
    clientID(): string;
    username(): string;
  };
}

const configuration: Configuration = {
  mySQL: {
    database: () => process.env.MYSQL_DATABASE,
    host: () => process.env.MYSQL_HOST,
    password: () => process.env.MYSQL_PASSWORD,
    username: () => process.env.MYSQL_USER,
  },
  twitchTV: {
    accessToken: () => process.env.TWITCHTV_ACCESS_TOKEN,
    channels: () => process.env.TWITCHTV_CHANNELS,
    clientID: () => process.env.TWITCHTV_CLIENT_ID,
    username: () => process.env.TWITCHTV_USERNAME,
  },
};

export default configuration;
