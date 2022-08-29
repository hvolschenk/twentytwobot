import shoutout from '../../commands/shoutout';
import configuration from '../../configuration';
import { knownStreamers } from '../../constants';
import shoutoutLogGetLatestByUsernamesFromTo from '../../database/shoutoutLogGetLatestByUsernamesFromTo';
import { User } from '../../types/User';

interface AutoShoutoutOptions {
  channel: string;
  usernameTo: User['username'];
}

const autoShoutout = async (options: AutoShoutoutOptions) => {
  if (knownStreamers.includes(options.usernameTo)) {
    const latestShoutout = await shoutoutLogGetLatestByUsernamesFromTo({
      usernameFrom: configuration.twitchTV.username(),
      usernameTo: options.usernameTo,
    });
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
