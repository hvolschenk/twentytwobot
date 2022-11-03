import { Events } from 'tmi.js';

import shoutoutLog from '../api/shoutoutLog';
import shoutoutLogFilter from '../api/shoutoutLogFilter';
import userGetByUsername from '../api/userGetByUsername';
import configuration from '../configuration';
import updateUserDetails from '../helpers/updateUserDetails';
import getTwitchClient from '../shared/getTwitchClient';
import { ShoutoutLog } from '../types/ShoutoutLog';
import { User } from '../types/User';

const getShoutoutsToUser = async (
  username: User['username']
): Promise<ShoutoutLog[] | null> => {
  try {
    const shoutouts = await shoutoutLogFilter({
      count: 1,
      usernameTo: username,
    });
    return shoutouts.status === 200 ? shoutouts.data : null;
  } catch (error) {
    return null;
  }
};

const getUser = async (username: User['username']): Promise<User | null> => {
  try {
    const user = await userGetByUsername({ username });
    return user.status === 200 ? user.data : null;
  } catch (error) {
    return null;
  }
};

const logShoutout = async (
  usernameFrom: User['username'],
  usernameTo: User['username']
): Promise<boolean> => {
  try {
    const shoutoutLogResponse = await shoutoutLog({ usernameFrom, usernameTo });
    return shoutoutLogResponse.status === 204;
  } catch (error) {
    return false;
  }
};

const shoutout: Events['chat'] = async (channel, tags, message) => {
  const twitchClient = getTwitchClient();
  const parts = message.split(' ');

  if (parts.length <= 1) {
    return;
  }

  const username = parts[1].replace('@', '');
  const shoutouts = await getShoutoutsToUser(username);

  if (!shoutouts) {
    twitchClient.say(channel, `Failed to shout @${username} out`);
    return;
  }

  const latestShoutout = shoutouts[0];
  if (
    latestShoutout &&
    Date.now() - latestShoutout.dateShouted <= 5 * 60 * 1000
  ) {
    return;
  }

  await updateUserDetails({ username });
  const user = await getUser(username);
  if (user === null) {
    twitchClient.say(channel, `Failed to shout @${username} out`);
    return;
  }

  const messageGame = user.lastGamePlayed
    ? `They were last seen playing '${user.lastGamePlayed}'. `
    : '';
  const messageIntro = `Shoutout to @${user.displayName}. They have been supporting my stream, and you should definitely support theirs. They are great!`;
  const messageLink = `Click here and give them a follow: https://twitch.tv/${user.username}`;
  twitchClient.say(channel, `${messageIntro} ${messageGame} ${messageLink}`);
  // One day when this becomes available to bots then all the rest can be removed
  twitchClient.say(channel, `/shoutout ${parts[1]}`);
  await logShoutout(
    tags.username || configuration.twitchTV.username(),
    username
  );
};

export default shoutout;
