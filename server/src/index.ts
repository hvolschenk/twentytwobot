import chat from './events/chat';
import join from './events/join';
import part from './events/part';
import raided from './events/raided';
import getDatabaseConnection from './shared/getDatabaseConnection';
import getTwitchClient from './shared/getTwitchClient';

getDatabaseConnection();

const twitchClient = getTwitchClient();
twitchClient.connect();

// When a user joins the channel
twitchClient.on('join', join);

// When a user leaves the channel
twitchClient.on('part', part);

// When the channel gets raided (this might not work)
twitchClient.on('raided', raided);

// Any standard message
twitchClient.on('chat', chat);
