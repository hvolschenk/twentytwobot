import { Events } from 'tmi.js';

import pointsGetTop from '../database/pointsGetTop';
import getTwitchClient from '../shared/getTwitchClient';

const pointstop: Events['chat'] = async (channel, tags, message) => {
  const twitchClient = getTwitchClient();
  const parts = message.split(' ');
  const count = parseInt(parts[1], 10) || 10;
  const points = await pointsGetTop({ count });
  const response = points.reduce(
    (accumulator, pointsWithUser, index) =>
      `${accumulator}\n${index + 1}. @${
        pointsWithUser.displayName
      }: ${pointsWithUser.points.toLocaleString('en')};`,
    ''
  );
  twitchClient.say(channel, response);
};

export default pointstop;
