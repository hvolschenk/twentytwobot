import { Events } from 'tmi.js';

import shoutout from '../commands/shoutout';
import commandLogCreate from '../database/commandLogCreate';
import getTwitchClient from '../shared/getTwitchClient';

const chat: Events['chat'] = async (channel, tags, message, self) => {
  const twitchClient = getTwitchClient();

  if (self || !message.startsWith('!') || !tags.username) {
    return;
  }

  const command = message.split(' ')[0].toLowerCase();
  await commandLogCreate({ commandName: command, username: tags.username });

  if(command === '!hello') {
    twitchClient.say(channel, `@${tags.username}, heya!`);
  }

  if (command === '!so' || command === '!shoutout') {
    shoutout(channel, tags, message, self);
  }
};

export default chat;
