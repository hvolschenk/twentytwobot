import { Events } from 'tmi.js';

import configuration from '../configuration';
import shoutoutLogAdd from '../database/shoutoutLogAdd';
import shoutoutLogGetLatestByUsernameTo from '../database/shoutoutLogGetLatestByUsernameTo';
import userGetByUsername from '../database/userGetByUsername';
import updateUserDetails from '../helpers/updateUserDetails';
import getTwitchClient from '../shared/getTwitchClient';

const shoutout: Events['chat'] = async (channel, tags, message) => {
  const twitchClient = getTwitchClient();
  const parts = message.split(' ');
  if (parts.length > 1) {
    const username = parts[1].replace('@', '');
    const latestShoutout = await shoutoutLogGetLatestByUsernameTo({ username });
    if (
      !latestShoutout ||
      Date.now() - latestShoutout.dateShouted > 1 * 1 * 5 * 60 * 1000
    ) {
      await updateUserDetails({ username });
      const user = await userGetByUsername({ username });
      if (user) {
        const messageGame = user.lastGamePlayed
          ? `They were last seen playing '${user.lastGamePlayed}'. `
          : '';
        const messageIntro = `Shoutout to @${user.displayName}. They have been supporting my stream, and you should definitely support theirs. They are great!`;
        const messageLink = `Click here and give them a follow: https://twitch.tv/${user.username}`;
        twitchClient.say(
          channel,
          `${messageIntro} ${messageGame} ${messageLink}`
        );
        await shoutoutLogAdd({
          usernameFrom: tags.username || configuration.twitchTV.username(),
          usernameTo: username,
        });
      }
    }
  }
};

export default shoutout;