import { Events } from 'tmi.js';

import pointsGetByUsername from '../database/pointsGetByUsername';
import getTwitchClient from '../shared/getTwitchClient';

const points: Events['chat'] = async (channel, tags, message) => {
  const twitchClient = getTwitchClient();
  const parts = message.split(' ');
  const username = parts.length > 1 ? parts[1].replace('@', '') : tags.username;
  if (!username) {
    twitchClient.say(channel, 'No user to display points for. Weird, huh?');
    return;
  }
  const pointsWithUser = await pointsGetByUsername({ username });
  if (!pointsWithUser) {
    twitchClient.say(
      channel,
      `Somehow @${username} does not have any points on record. @22atreyu22 you need to fix this, dude.`
    );
    return;
  }
  if (username === tags.username) {
    twitchClient.say(
      channel,
      `@${
        pointsWithUser.displayName
      }, you have ${pointsWithUser.points.toLocaleString('en')} points.`
    );
    return;
  }
  twitchClient.say(
    channel,
    `@${pointsWithUser.displayName} has ${pointsWithUser.points.toLocaleString(
      'en'
    )} points.`
  );
};

export default points;
