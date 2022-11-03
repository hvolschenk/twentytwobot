import compression from 'compression';
import express from 'express';
import helmet from 'helmet';

import configuration from './configuration';
import routerCommand from './routes/command';
import routerPoints from './routes/points';
import routerShoutout from './routes/shoutout';
import routerTamagotchi from './routes/tamagotchi';
import routerTamagotchiType from './routes/tamagotchiType';
import routerTimer from './routes/timer';
import routerUser from './routes/user';
import logger from './shared/logger';
import middleware404 from './shared/middleware/404';
import middlewareError from './shared/middleware/error';
import middlewareResponse from './shared/middleware/response';
import {
  command,
  points,
  shoutout,
  tamagotchi,
  tamagotchiType,
  timer,
  user,
} from './urls';

const app = express();

app.disable('x-powered-by');
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());

app.use(command(), routerCommand);
app.use(points(), routerPoints);
app.use(shoutout(), routerShoutout);
app.use(tamagotchi(), routerTamagotchi);
app.use(tamagotchiType(), routerTamagotchiType);
app.use(timer(), routerTimer);
app.use(user(), routerUser);

app.use(middleware404);
app.use(middlewareResponse);
app.use(middlewareError);

app.listen(3000, '0.0.0.0', () => {
  logger.info(
    `'${configuration.application.name()}' started successfully, listening on '0.0.0.0:3000'`
  );
});
