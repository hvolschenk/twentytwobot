import { Events } from 'tmi.js';

import shoutout from '../commands/shoutout';
import { knownStreamers } from '../constants';
import updateUserDetails from '../helpers/updateUserDetails';

const join: Events['join'] = async (channel, username) => {
  await updateUserDetails({ username });

  if (knownStreamers.includes(username)) {
    shoutout(channel, { username: '@twentytwobot' }, `!so @${username}`, true);
  }
};

export default join;
