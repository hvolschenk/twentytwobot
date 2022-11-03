import userCreate from '../api/userCreate';
import userGetByUsername from '../api/userGetByUsername';
import userUpdate from '../api/userUpdate';
import { knownBots } from '../constants';
import getChannelInformation from '../twitch/getChannelInformation';
import getUserInformation from '../twitch/getUserInformation';
import { User } from '../types/User';

interface UpdateUserDetailsOptions {
  forceUpdate?: boolean;
  username: User['username'];
}

const getStoredUser = async (
  username: User['username']
): Promise<User | null> => {
  try {
    const storedUser = await userGetByUsername({ username });
    return storedUser.status === 200 ? storedUser.data : null;
  } catch (error) {
    return null;
  }
};

const updateUserDetails = async ({
  forceUpdate = false,
  username,
}: UpdateUserDetailsOptions) => {
  const storedUser = await getStoredUser(username);
  if (!storedUser) {
    const userInformation = await getUserInformation(username);
    const channelInformation = await getChannelInformation(userInformation.id);
    await userCreate({
      displayName: channelInformation.broadcaster_name,
      isBot: knownBots.includes(channelInformation.broadcaster_login),
      lastGamePlayed: channelInformation.game_name,
      twitchID: channelInformation.broadcaster_id,
      username: channelInformation.broadcaster_login,
    });
  } else if (
    forceUpdate ||
    Date.now() - storedUser.dateUpdated > 1 * 24 * 60 * 60 * 1000
  ) {
    const channelInformation = await getChannelInformation(storedUser.twitchID);
    await userUpdate({
      displayName: channelInformation.broadcaster_name,
      id: storedUser.id,
      lastGamePlayed: channelInformation.game_name,
      twitchID: channelInformation.broadcaster_id,
    });
  }
};

export default updateUserDetails;
