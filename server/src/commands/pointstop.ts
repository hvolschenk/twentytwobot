import { Events } from 'tmi.js';

import pointsGetTop from '../api/pointsGetTop';
import getTwitchClient from '../shared/getTwitchClient';
import { UserWithPoints } from '../types/UserWithPoints';

const getTopPoints = async (
  count: number
): Promise<UserWithPoints[] | null> => {
  try {
    const points = await pointsGetTop({ count });
    return points.status === 200 ? points.data : null;
  } catch (error) {
    return null;
  }
};

const pointstop: Events['chat'] = async (channel, tags, message) => {
  const twitchClient = getTwitchClient();
  const parts = message.split(' ');
  const count = parseInt(parts[1], 10) || 10;
  const points = await getTopPoints(count);
  if (!points) {
    twitchClient.say(
      channel,
      'Something went wrong while getting the points leaderboard'
    );
    return;
  }
  const response = points.reduce(
    (accumulator, userWithPoints, index) =>
      `${accumulator}\n${index + 1}. @${
        userWithPoints.displayName
      }: ${userWithPoints.points.points.toLocaleString('en')};`,
    ''
  );
  twitchClient.say(channel, response);
};

export default pointstop;
