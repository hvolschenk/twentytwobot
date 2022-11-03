import { Events } from 'tmi.js';

import tamagotchiUpdate from '../../api/tamagotchiUpdate';
import getTwitchClient from '../../shared/getTwitchClient';
import { Tamagotchi } from '../../types/Tamagotchi';
import { TamagotchiType } from '../../types/TamagotchiType';
import { User } from '../../types/User';

const updateTamagotchi = async (
  id: Tamagotchi['id'],
  name: Tamagotchi['name']
): Promise<boolean> => {
  try {
    const tamagotchiUpdateResponse = await tamagotchiUpdate({
      id,
      name,
    });
    return tamagotchiUpdateResponse.status === 204;
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
const name =
  ({ tamagotchi, user }: FeedOptions): Events['chat'] =>
  async (channel, tags, message) => {
    const parts = message.split(' ');
    const twitchClient = getTwitchClient();

    if (parts.length === 2) {
      twitchClient.say(
        channel,
        `@${user.displayName} please provide a name, for example '!tama name InsertNameHere'.`
      );
      return;
    }
    const newName = parts[2].substring(0, 32);
    const tamagotchiUpdateResponse = await updateTamagotchi(
      tamagotchi.id,
      newName
    );
    if (!tamagotchiUpdateResponse) {
      twitchClient.say(
        channel,
        `@${user.displayName}, there was an error updating your tamagotchi's name.`
      );
      return;
    }
    twitchClient.say(
      channel,
      `@${user.displayName}, I am sure your tamagotchi is pleased with its new name: ${newName}. Type '!tama' to see stats.`
    );
  };

export default name;
