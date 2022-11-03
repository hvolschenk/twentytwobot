import { LogLevelString } from 'bunyan';

interface Configuration {
  application: {
    name(): string;
  };
  log: {
    level(): LogLevelString;
    path(fileName: string): string;
  };
  mySQL: {
    database(): string;
    host(): string;
    password(): string;
    username(): string;
  };
}

const configuration: Configuration = {
  application: {
    name: () => process.env.APPLICATION_NAME,
  },
  log: {
    level: () => process.env.LOG_LEVEL,
    path: (fileName: string) => `${process.env.LOG_PATH}/${fileName}.log`,
  },
  mySQL: {
    database: () => process.env.MYSQL_DATABASE,
    host: () => process.env.MYSQL_HOST,
    password: () => process.env.MYSQL_PASSWORD,
    username: () => process.env.MYSQL_USER,
  },
};

export default configuration;
