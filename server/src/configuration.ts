interface Configuration {
  api: {
    baseURL(): string;
  };
  twitchTV: {
    accessToken(): string;
    channels(): string;
    clientID(): string;
    username(): string;
  };
}

const configuration: Configuration = {
  api: {
    baseURL: () => process.env.API_BASE_URL,
  },
  twitchTV: {
    accessToken: () => process.env.TWITCHTV_ACCESS_TOKEN,
    channels: () => process.env.TWITCHTV_CHANNELS,
    clientID: () => process.env.TWITCHTV_CLIENT_ID,
    username: () => process.env.TWITCHTV_USERNAME,
  },
};

export default configuration;
