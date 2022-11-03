import { LogLevelString } from 'bunyan';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APPLICATION_NAME: string;
      LOG_LEVEL: LogLevelString;
      LOG_PATH: string;
      MYSQL_DATABASE: string;
      MYSQL_HOST: string;
      MYSQL_PASSWORD: string;
      MYSQL_USER: string;
      NODE_ENV: 'development' | 'production';
      PWD: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
