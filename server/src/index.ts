import tmi from 'tmi.js';

import shoutout from './commands/shoutout';
import commandLogCreate from'./database/commandLogCreate';
import join from './events/join';
import raided from './events/raided';
import getDatabaseConnection from './shared/getDatabaseConnection';
import getTwitchClient from './shared/getTwitchClient';

getDatabaseConnection();

const twitchClient = getTwitchClient();
twitchClient.connect();

// When a user joins the channel
twitchClient.on('join', join);

// When the channel gets raided (this might not work)
twitchClient.on('raided', raided);

// Any standard message
twitchClient.on('chat', async (channel, tags, message, self) => {
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
});
