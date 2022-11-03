import { Events } from 'tmi.js';

import pointsAdd from '../api/pointsAdd';
import pointsRemove from '../api/pointsRemove';
import getTwitchClient from '../shared/getTwitchClient';
import { Points } from '../types/Points';
import { User } from '../types/User';

const addPoints = async (
  username: User['username'],
  points: Points['points']
): Promise<boolean> => {
  try {
    const pointsAddRequest = await pointsAdd({ points, username });
    return pointsAddRequest.status === 204;
  } catch (error) {
    return false;
  }
};

const removePoints = async (
  username: User['username'],
  points: Points['points']
): Promise<boolean> => {
  try {
    const pointsRemoveRequest = await pointsRemove({ points, username });
    return pointsRemoveRequest.status === 204;
  } catch (error) {
    return false;
  }
};

const gamble: Events['chat'] = async (channel, tags, message) => {
  const twitchClient = getTwitchClient();
  const parts = message.split(' ');
  const d20 = Math.floor(20 * Math.random()) + 1;
  const points = parseInt(parts[1], 10) || 22;

  if (d20 > 10) {
    const pointsAddRequest = await addPoints(tags.username!, points);
    if (!pointsAddRequest) {
      twitchClient.say(
        channel,
        `@${tags.username}, something broke during gambling. Whoops.`
      );
      return;
    }
    twitchClient.say(
      channel,
      `@${tags.username}, you rolled ${d20} and gained ${points} points.`
    );
    return;
  }

  const pointsRemoveRequest = await removePoints(tags.username!, points);
  if (!pointsRemoveRequest) {
    twitchClient.say(
      channel,
      `@${tags.username}, something broke during gambling. Whoops.`
    );
    return;
  }
  twitchClient.say(
    channel,
    `@${tags.username}, you rolled ${d20} and lost ${points} points.`
  );
};

export default gamble;
