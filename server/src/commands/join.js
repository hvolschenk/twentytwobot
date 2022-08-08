const getChannelInformation = require('../api/getChannelInformation');
const getUserInformation = require('../api/getUserInformation');
const { knownStreamers } = require('../constants');
const userCreate = require('../database/userCreate');
const userGetByUsername = require('../database/userGetByUsername');
const userUpdate = require('../database/userUpdate');
const shoutout = require('./shoutout');

const join = async (channel, username) => {
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
    shoutout(channel, { username }, `!so @${username}`, true);
  }
};

module.exports = join;
