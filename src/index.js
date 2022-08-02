const tmi = require('tmi.js');

const configuration = require('./configuration');

const client = new tmi.Client({
  options: { debug: true },
  identity: {
    username: configuration.twitchTV.username(),
    password: `oauth:${configuration.twitchTV.authenticationToken()}`,
  },
  channels: configuration.twitchTV.channels().split(','),
});

client.connect();

client.on('message', (channel, tags, message, self) => {
  if (self || !message.startsWith('!')) {
    return;
  }

  if(message.toLowerCase() === '!hello') {
    client.say(channel, `@${tags.username}, heya!`);
  }
});
