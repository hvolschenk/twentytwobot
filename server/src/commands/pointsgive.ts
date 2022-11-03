import { Events } from 'tmi.js';

import pointsGive from '../api/pointsGive';
import getTwitchClient from '../shared/getTwitchClient';
import { Points } from '../types/Points';
import { User } from '../types/User';

const givePoints = async (
  from: User['username'],
  to: User['username'],
  points: Points['points']
): Promise<boolean> => {
  try {
    const pointsGiveRequest = await pointsGive({ from, points, to });
    return pointsGiveRequest.status === 204;
  } catch (error) {
    return false;
  }
};

const pointsgive: Events['chat'] = async (channel, tags, message) => {
  const twitchClient = getTwitchClient();
  const parts = message.split(' ');
  if (!tags.username) {
    return;
  }
  if (parts.length <= 2) {
    return;
  }
  const username = parts[1].replace('@', '');
  const points = parseInt(parts[2], 10);
  if (username === tags.username) {
    twitchClient.say(
      channel,
      `Hey @${tags.username}, are you trying to trick me?`
    );
    return;
  }
  const pointsGiveRequest = await givePoints(tags.username, username, points);
  if (!pointsGiveRequest) {
    twitchClient.say(
      channel,
      `@${tags.username}, something went wrong while trying to give points to @${username}`
    );
    return;
  }
  twitchClient.say(
    channel,
    `@${tags.username} gave ${points} points to @${username}`
  );
};

export default pointsgive;
