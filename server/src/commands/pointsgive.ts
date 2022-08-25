import { Events } from 'tmi.js';

import pointsAdd from '../database/pointsAdd';
import pointsRemove from '../database/pointsRemove';
import getTwitchClient from '../shared/getTwitchClient';

const pointsgive: Events['chat'] = async (channel, tags, message) => {
  const twitchClient = getTwitchClient();
  const parts = message.split(' ');
  const username = (parts[1] || '22atreyu22').replace('@', '');
  const points = parseInt(parts[2], 10) || 22;
  if (username === tags.username) {
    twitchClient.say(
      channel,
      `Hey @${tags.username}, are you trying to trick me?`
    );
    return;
  }
  await pointsAdd({ points, username });
  await pointsRemove({ points, username: tags.username });
  twitchClient.say(
    channel,
    `@${tags.username} gave ${points} points to @${username}`
  );
};

export default pointsgive;
