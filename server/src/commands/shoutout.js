const userGetByUsername = require('../database/userGetByUsername');
const getTwitchClient = require('../shared/getTwitchClient');

const shoutout = async (channel, tags, message, self) => {
  const shoutedUser = message.split(' ')[1].replace('@', '');
  const twitchClient = getTwitchClient();
  const user = await userGetByUsername({ username: shoutedUser });
  if (!user) {
    twitchClient.say(channel, `I do not have any information on '@${shoutedUser}' stored locally.`);
  } else {
    twitchClient.say(channel, `Go check out @${user.displayName} on their channel: https://twitch.tv/${user.username}. They were last seen playing '${user.lastGamePlayed}'.`);
  }
};

module.exports = shoutout;
