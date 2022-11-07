import { Events } from 'tmi.js';

import tamagotchiCare from '../../api/tamagotchiCare';
import getTwitchClient from '../../shared/getTwitchClient';
import { Tamagotchi } from '../../types/Tamagotchi';
import { TamagotchiType } from '../../types/TamagotchiType';
import { User } from '../../types/User';

const careForTamagotchi = async (id: Tamagotchi['id']): Promise<boolean> => {
  try {
    await tamagotchiCare({ food: 10, id });
    return true;
  } catch (error) {
    return false;
  }
};

interface FeedOptions {
  tamagotchi: Tamagotchi;
  tamagotchiType: TamagotchiType;
  user: User;
}

/**
 * The real deal
 */
const feed =
  ({ tamagotchi, tamagotchiType, user }: FeedOptions): Events['chat'] =>
  async (channel) => {
    const twitchClient = getTwitchClient();
    const careResult = await careForTamagotchi(tamagotchi.id);
    if (!careResult) {
      twitchClient.say(
        channel,
        `@${user.displayName} something went wrong and ${tamagotchi.name} could not be entertained right now.`
      );
      return;
    }
    twitchClient.say(
      channel,
      `${tamagotchiType.display} ... @${user.displayName} you gave ${
        tamagotchi.name
      } a delicious treat. Food ${Math.min(tamagotchi.food + 10, 10)}/10.`
    );
  };

export default feed;
