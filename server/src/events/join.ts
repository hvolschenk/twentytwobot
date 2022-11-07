import { Events } from 'tmi.js';

import userJoinByUsername from '../api/userJoinByUsername';
import configuration from '../configuration';
import updateUserDetails from '../helpers/updateUserDetails';
import { tamagotchi, timer } from '../timers';

const join: Events['join'] = async (channel, username) => {
  if (username === configuration.twitchTV.username()) {
    timer(channel);
    tamagotchi(channel);
  }
  try {
    await updateUserDetails({ username });
    await userJoinByUsername({ username });
  } catch (error) {
    console.log('Error joining user', (error as Error).message);
  }
};

export default join;
