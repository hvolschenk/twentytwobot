import { Events } from 'tmi.js';

import getChannelInformation from '../api/getChannelInformation';
import getUserInformation from '../api/getUserInformation';
import shoutout from '../commands/shoutout';
import { knownStreamers } from '../constants';
import userCreate from '../database/userCreate';
import userGetByUsername from '../database/userGetByUsername';
import userUpdate from '../database/userUpdate';

const join: Events['join'] = async (channel, username) => {
  const storedUser = await userGetByUsername({ username });
  if (!storedUser) {
    const userInformation = await getUserInformation(username);
    const channelInformation = await getChannelInformation(userInformation.id);
    await userCreate({
      displayName: channelInformation.broadcaster_name,
      lastGamePlayed: channelInformation.game_name,
      twitchID: channelInformation.broadcaster_id,
      username: channelInformation.broadcaster_login,
    });
  } else {
    const channelInformation = await getChannelInformation(storedUser.twitchID);
    await userUpdate({
      displayName: channelInformation.broadcaster_name,
      lastGamePlayed: channelInformation.game_name,
      twitchID: channelInformation.broadcaster_id,
      id: storedUser.id,
    });
  }

  if (knownStreamers.includes(username)) {
    shoutout(channel, { username: '@twentytwobot' }, `!so @${username}`, true);
  }
};

export default join;
