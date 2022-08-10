import { Events } from 'tmi.js';

import userGetByUsername from '../database/userGetByUsername';
import updateUserDetails from '../helpers/updateUserDetails';
import getTwitchClient from '../shared/getTwitchClient';

const raided: Events['raided'] = async (channel, username, viewers) => {
  const twitchClient = getTwitchClient();
  await updateUserDetails({ forceUpdate: true, username });
  const raider = await userGetByUsername({ username });
  if (raider) {
    twitchClient.say(
      channel,
      `Welcome @${raider.displayName} plus ${viewers} <3 <3 <3 Thank you so much for the raid! How did the '${raider.lastGamePlayed}' stream go?`
    );
  }
};

export default raided;
