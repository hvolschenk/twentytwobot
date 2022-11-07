import shoutoutLogFilter from '../../api/shoutoutLogFilter';
import shoutout from '../../commands/shoutout';
import configuration from '../../configuration';
import { knownStreamers } from '../../constants';
import { ShoutoutLog } from '../../types/ShoutoutLog';
import { User } from '../../types/User';

const getShoutouts = async (
  usernameFrom: User['username'],
  usernameTo: User['username']
): Promise<ShoutoutLog[]> => {
  try {
    const shoutouts = await shoutoutLogFilter({
      count: 1,
      usernameFrom,
      usernameTo,
    });
    return shoutouts.status === 200 ? shoutouts.data : [];
  } catch (error) {
    return [];
  }
};

interface AutoShoutoutOptions {
  channel: string;
  usernameTo: User['username'];
}

const autoShoutout = async (options: AutoShoutoutOptions) => {
  if (knownStreamers.includes(options.usernameTo)) {
    const shoutouts = await getShoutouts(
      configuration.twitchTV.username(),
      options.usernameTo
    );
    const latestShoutout = shoutouts[0];
    if (
      !latestShoutout ||
      Date.now() - latestShoutout.dateShouted > 1 * 8 * 60 * 60 * 1000
    ) {
      await shoutout(
        options.channel,
        { username: configuration.twitchTV.username() },
        `!shoutout ${options.usernameTo}`,
        true
      );
    }
  }
};

export default autoShoutout;
