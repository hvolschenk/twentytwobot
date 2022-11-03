declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_BASE_URL: string;
      NODE_ENV: 'development' | 'production';
      PWD: string;
      TWITCHTV_ACCESS_TOKEN: string;
      TWITCHTV_CHANNELS: string;
      TWITCHTV_CLIENT_ID: string;
      TWITCHTV_USERNAME: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
