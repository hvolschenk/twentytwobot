import chat from './events/chat';
import join from './events/join';
import part from './events/part';
import raided from './events/raided';
import getTwitchClient from './shared/getTwitchClient';

const twitchClient = getTwitchClient();

const connect = () => {
  try {
    twitchClient.connect();
    twitchClient
      .on('join', join)
      .on('part', part)
      .on('raided', raided)
      .on('chat', chat);
  } catch (error) {
    console.log('Error connecting', (error as Error).message);
    setTimeout(connect, 2000);
  }
};

connect();
