import { Events } from 'tmi.js';

import pointsGetByUsername from '../api/pointsGetByUsername';
import getTwitchClient from '../shared/getTwitchClient';
import { User } from '../types/User';
import { UserWithPoints } from '../types/UserWithPoints';

const getUserWithPoints = async (
  username: User['username']
): Promise<UserWithPoints | null> => {
  try {
    const userWithPoints = await pointsGetByUsername({ username });
    return userWithPoints.status === 200 ? userWithPoints.data : null;
  } catch (error) {
    return null;
  }
};

const points: Events['chat'] = async (channel, tags, message) => {
  const twitchClient = getTwitchClient();
  const parts = message.split(' ');
  const username = parts.length > 1 ? parts[1].replace('@', '') : tags.username;
  if (!username) {
    twitchClient.say(channel, 'No user to display points for. Weird, huh?');
    return;
  }
  const userWithPoints = await getUserWithPoints(username);
  if (!userWithPoints) {
    twitchClient.say(
      channel,
      `Somehow @${username} does not have any points on record. @22atreyu22 you need to fix this, dude.`
    );
    return;
  }
  twitchClient.say(
    channel,
    `@${
      userWithPoints.displayName
    } has ${userWithPoints.points.points.toLocaleString('en')} points.`
  );
};

export default points;
