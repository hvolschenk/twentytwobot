import getChannelInformation from '../api/getChannelInformation';
import getUserInformation from '../api/getUserInformation';
import userCreate from '../database/userCreate';
import userGetByUsername from '../database/userGetByUsername';
import userUpdate from '../database/userUpdate';
import { User } from '../types/User';

interface UpdateUserDetailsOptions {
  forceUpdate?: boolean;
  username: User['username'];
}

const updateUserDetails = async ({
  forceUpdate = false,
  username,
}: UpdateUserDetailsOptions) => {
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
  } else if (
    forceUpdate ||
    Date.now() - storedUser.dateUpdated > 1 * 24 * 60 * 60 * 1000
  ) {
    const channelInformation = await getChannelInformation(storedUser.twitchID);
    await userUpdate({
      displayName: channelInformation.broadcaster_name,
      lastGamePlayed: channelInformation.game_name,
      twitchID: channelInformation.broadcaster_id,
      id: storedUser.id,
    });
  }
};

export default updateUserDetails;
