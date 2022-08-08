const userGetByUsername = require('../database/userGetByUsername')
const getTwitchClient = require('../shared/getTwitchClient');

const raided = async (channel, username, viewers) => {
  const twitchClient = getTwitchClient();
  const raider = await userGetByUsername({ username });
  if (raider) {
    twitchClient.say(
      channel,
      `Welcome @${raider.displayName} plus ${viewers} <3 <3 <3 Thank you so much for the raid! How was the '${raider.lastGamePlayed}' gameplay? How did the stream go?`,
    );
  }
};

module.exports = raided;
