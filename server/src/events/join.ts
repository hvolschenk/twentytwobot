import { Events } from 'tmi.js';

import { knownStreamers } from '../constants';
import configuration from '../configuration';
import userLogJoin from '../database/userLogJoin';
import updateUserDetails from '../helpers/updateUserDetails';
import getTwitchClient from '../shared/getTwitchClient';
import startTimers from '../timers';

const join: Events['join'] = async (channel, username) => {
  const twitchClient = getTwitchClient();
  if (username === configuration.twitchTV.username()) {
    startTimers(channel);
  }
  await updateUserDetails({ username });
  await userLogJoin({ username });

  if (knownStreamers.includes(username)) {
    twitchClient.say(channel, `!shoutout @${username}`);
  }
};

export default join;
