import { Events } from 'tmi.js';

import { knownStreamers } from '../constants';
import updateUserDetails from '../helpers/updateUserDetails';
import getTwitchClient from '../shared/getTwitchClient';

const join: Events['join'] = async (channel, username) => {
  const twitchClient = getTwitchClient();
  await updateUserDetails({ username });

  if (knownStreamers.includes(username)) {
    twitchClient.say(channel, `!shoutout @${username}`);
  }
};

export default join;
