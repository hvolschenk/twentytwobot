import { Events } from 'tmi.js';

import shoutout from '../commands/shoutout';
import commandLogCreate from '../database/commandLogCreate';
import updateUserDetails from '../helpers/updateUserDetails';
import getTwitchClient from '../shared/getTwitchClient';

const chat: Events['chat'] = async (channel, tags, message, self) => {
  const twitchClient = getTwitchClient();

  if (self || !message.startsWith('!') || !tags.username) {
    return;
  }

  await updateUserDetails({ username: tags.username });

  const command = message.split(' ')[0].toLowerCase();
  await commandLogCreate({ commandName: command, username: tags.username });

  if (command === '!bot') {
    twitchClient.say(
      channel,
      'Hey. I am @twentytwobot, built by @22atreyu22 for his channel. type !commands or !help to see what I can do.'
    );
  }

  if (command === '!hello') {
    twitchClient.say(channel, `@${tags.username}, heya!`);
  }

  if (command === '!so' || command === '!shoutout') {
    shoutout(channel, tags, message, self);
  }
};

export default chat;
