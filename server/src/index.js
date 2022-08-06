const mysql = require('mysql2');
const tmi = require('tmi.js');

const configuration = require('./configuration');
const { botUsers, knownStreamers } = require('./constants');
const commandLogCreate = require('./database/commandLogCreate');
const userCreate = require('./database/userCreate');

const mysqlConnection = mysql.createConnection({
  database: configuration.mySQL.database(),
  host: configuration.mySQL.host(),
  password: configuration.mySQL.password(),
  user: configuration.mySQL.username(),
});

const client = new tmi.Client({
  options: { debug: true },
  identity: {
    username: configuration.twitchTV.username(),
    password: `oauth:${configuration.twitchTV.accessToken()}`,
  },
  channels: configuration.twitchTV.channels().split(','),
});

client.connect();

// When a user joins the channel
client.on('join', async (channel, username, self) => {
  if (self || botUsers.includes(username)) {
    return;
  }
  await userCreate(mysqlConnection, username);
  if (knownStreamers.includes(username)) {
    client.say(channel, `!so @${username}`);
  }
});

// Any standard message
client.on('chat', async (channel, tags, message, self) => {
  if (self || !message.startsWith('!')) {
    return;
  }
  const command = message.split(' ')[0].toLowerCase();
  await commandLogCreate(mysqlConnection, command);
  if(command === '!hello') {
    client.say(channel, `@${tags.username}, heya!`);
  }
});
