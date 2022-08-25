import { Events } from 'tmi.js';

import pointsAdd from '../database/pointsAdd';
import pointsRemove from '../database/pointsRemove';
import getTwitchClient from '../shared/getTwitchClient';

const gamble: Events['chat'] = async (channel, tags, message) => {
  const twitchClient = getTwitchClient();
  const parts = message.split(' ');
  const d20 = Math.floor(20 * Math.random()) + 1;
  const points = parseInt(parts[1], 10) || 22;

  if (d20 === 20) {
    await pointsAdd({ points: points * 2, username: tags.username });
    twitchClient.say(
      channel,
      `@${tags.username}, you rolled a natural ${d20}! You gained ${
        points * 2
      } points.`
    );
    return;
  }

  if (d20 > 10) {
    await pointsAdd({ points, username: tags.username });
    twitchClient.say(
      channel,
      `@${tags.username}, you rolled ${d20} and gained ${points} points.`
    );
    return;
  }
  await pointsRemove({ points, username: tags.username });
  twitchClient.say(
    channel,
    `@${tags.username}, you rolled ${d20} and lost ${points} points.`
  );
};

export default gamble;
