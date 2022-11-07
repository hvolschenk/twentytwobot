import bunyan from 'bunyan';
import bunyanExpressCommonLogFormat from 'bunyan-express-common-log-format';

import configuration from '../../configuration';

const logger = bunyan.createLogger({
  name: `${configuration.application.name()} (PID: ${process.pid})`,
  serializers: {
    err: bunyan.stdSerializers.err,
    response: bunyanExpressCommonLogFormat,
  },
  streams: [
    { level: configuration.log.level(), stream: process.stdout },
    {
      level: configuration.log.level(),
      path: configuration.log.path(configuration.application.name()),
    },
  ],
});

export default logger;
