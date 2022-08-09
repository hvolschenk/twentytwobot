import { Events } from 'tmi.js';

import userGetByUsername from '../database/userGetByUsername';
import getTwitchClient from '../shared/getTwitchClient';

const raided: Events['raided'] = async (channel, username, viewers) => {
  const twitchClient = getTwitchClient();
  const raider = await userGetByUsername({ username });
  if (raider) {
    twitchClient.say(
      channel,
      `Welcome @${raider.displayName} plus ${viewers} <3 <3 <3 Thank you so much for the raid! How was the '${raider.lastGamePlayed}' gameplay? How did the stream go?`,
    );
  }
};

export default raided;
