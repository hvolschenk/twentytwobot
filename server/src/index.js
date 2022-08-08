const tmi = require('tmi.js');

const join = require('./commands/join');
const raided = require('./commands/raided');
const shoutout = require('./commands/shoutout');
const commandLogCreate = require('./database/commandLogCreate');
const getDatabaseConnection = require('./shared/getDatabaseConnection');
const getTwitchClient = require('./shared/getTwitchClient');

getDatabaseConnection();

const twitchClient = getTwitchClient();
twitchClient.connect();

// When a user joins the channel
twitchClient.on('join', join);

// When the channel gets raided (this might not work)
twitchClient.on('raided', raided);

// Any standard message
twitchClient.on('chat', async (channel, tags, message, self) => {
  if (self || !message.startsWith('!')) {
    return;
  }
  const command = message.split(' ')[0].toLowerCase();
  await commandLogCreate({ commandName: command, username: tags.username });
  if(command === '!hello') {
    twitchClient.say(channel, `@${tags.username}, heya!`);
  }
  if (command === '!so' || command === '!shoutout') {
    shoutout(channel, tags.username, message);
  }
});
