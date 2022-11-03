import { Events } from 'tmi.js';

import tamagotchiCare from '../../api/tamagotchiCare';
import getTwitchClient from '../../shared/getTwitchClient';
import { Tamagotchi } from '../../types/Tamagotchi';
import { TamagotchiType } from '../../types/TamagotchiType';
import { User } from '../../types/User';

const careForTamagotchi = async (id: Tamagotchi['id']): Promise<boolean> => {
  try {
    await tamagotchiCare({ entertainment: 10, id });
    return true;
  } catch (error) {
    return false;
  }
};

interface PlayOptions {
  tamagotchi: Tamagotchi;
  tamagotchiType: TamagotchiType;
  user: User;
}

/**
 * The real deal
 */
const play =
  ({ tamagotchi, tamagotchiType, user }: PlayOptions): Events['chat'] =>
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
      `${tamagotchiType.display} ... @${
        user.displayName
      } you played fetch with ${tamagotchi.name}. Entertainment ${Math.min(
        tamagotchi.entertainment + 10,
        10
      )}/10.`
    );
  };

export default play;
