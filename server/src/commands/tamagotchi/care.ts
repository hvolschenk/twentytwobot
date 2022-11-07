import { Events } from 'tmi.js';

import tamagotchiCare from '../../api/tamagotchiCare';
import getTwitchClient from '../../shared/getTwitchClient';
import { Tamagotchi } from '../../types/Tamagotchi';
import { TamagotchiType } from '../../types/TamagotchiType';
import { User } from '../../types/User';

const careForTamagotchi = async (id: Tamagotchi['id']): Promise<boolean> => {
  try {
    await tamagotchiCare({
      clean: 10,
      entertainment: 10,
      food: 10,
      id,
    });
    return true;
  } catch (error) {
    return false;
  }
};

interface CareOptions {
  tamagotchi: Tamagotchi;
  tamagotchiType: TamagotchiType;
  user: User;
}

/**
 * The real deal
 */
const care =
  ({ tamagotchi, tamagotchiType, user }: CareOptions): Events['chat'] =>
  async (channel) => {
    const twitchClient = getTwitchClient();
    const careResult = await careForTamagotchi(tamagotchi.id);
    if (!careResult) {
      twitchClient.say(
        channel,
        `@${user.displayName} something went wrong and ${tamagotchi.name} could not be cared for right now.`
      );
      return;
    }
    twitchClient.say(
      channel,
      `${tamagotchiType.display} ... @${user.displayName} you took great care of all required needs for ${tamagotchi.name}, and they are all at 10 again. Yay.`
    );
  };

export default care;
