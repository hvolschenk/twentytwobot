import { Events } from 'tmi.js';

import userGetByUsername from '../api/userGetByUsername';
import updateUserDetails from '../helpers/updateUserDetails';
import getTwitchClient from '../shared/getTwitchClient';
import { User } from '../types/User';

const getUser = async (username: User['username']): Promise<User | null> => {
  try {
    const user = await userGetByUsername({ username });
    return user.status === 200 ? user.data : null;
  } catch (error) {
    return null;
  }
};

const raided: Events['raided'] = async (channel, username, viewers) => {
  const twitchClient = getTwitchClient();
  await updateUserDetails({ forceUpdate: true, username });
  const raider = await getUser(username);
  if (!raider) {
    return;
  }
  twitchClient.say(
    channel,
    `Welcome @${raider.displayName} plus ${viewers} <3 <3 <3 Thank you so much for the raid! How did the '${raider.lastGamePlayed}' stream go?`
  );
};

export default raided;
