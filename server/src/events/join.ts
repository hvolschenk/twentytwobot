import { Events } from 'tmi.js';

import configuration from '../configuration';
import userLogJoin from '../database/userLogJoin';
import updateUserDetails from '../helpers/updateUserDetails';
import startTimers from '../timers';

const join: Events['join'] = async (channel, username) => {
  if (username === configuration.twitchTV.username()) {
    startTimers(channel);
  }
  await updateUserDetails({ username });
  await userLogJoin({ username });
};

export default join;
