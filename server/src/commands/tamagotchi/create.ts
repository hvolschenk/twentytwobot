import { Events } from 'tmi.js';

import tamagotchiCreate from '../../api/tamagotchiCreate';
import tamagotchiGetByUsername from '../../api/tamagotchiGetByUsername';
import tamagotchiTypeGetByID from '../../api/tamagotchiTypeGetByID';
import getTwitchClient from '../../shared/getTwitchClient';
import { TamagotchiType } from '../../types/TamagotchiType';
import { TamagotchiWithUser } from '../../types/TamagotchiWithUser';
import { User } from '../../types/User';

const createTamagotchi = async (
  username: User['username']
): Promise<boolean> => {
  try {
    const response = await tamagotchiCreate({ username });
    return response.status === 204;
  } catch (error) {
    return false;
  }
};

const getTamagotchiType = async (
  tamagotchiTypeID: TamagotchiType['id']
): Promise<TamagotchiType | null> => {
  try {
    const tamagotchiType = await tamagotchiTypeGetByID({
      id: tamagotchiTypeID,
    });
    return tamagotchiType.status === 200 ? tamagotchiType.data : null;
  } catch (error) {
    return null;
  }
};

const getUserTamagotchi = async (
  username: User['username']
): Promise<TamagotchiWithUser | null> => {
  try {
    const userTamagotchiRequest = await tamagotchiGetByUsername({ username });
    return userTamagotchiRequest.status === 200
      ? userTamagotchiRequest.data
      : null;
  } catch (error) {
    return null;
  }
};

/**
 * The real deal.
 */
interface CreateOptions {
  user: User;
}

const create =
  ({ user }: CreateOptions): Events['chat'] =>
  async (channel) => {
    const twitchClient = getTwitchClient();

    if (!createTamagotchi(user.username)) {
      twitchClient.say(
        channel,
        `@${user.displayName}, something went wrong while trying to capture a tamagotchi for you.`
      );
      return;
    }

    const userTamagotchi = await getUserTamagotchi(user.username);
    if (!userTamagotchi) {
      twitchClient.say(
        channel,
        `@${user.displayName}, something went wrong while trying to capture a tamagotchi for you.`
      );
      return;
    }

    const tamagotchiType = await getTamagotchiType(
      userTamagotchi.tamagotchiTypeID
    );
    if (!tamagotchiType) {
      twitchClient.say(
        channel,
        `@${user.displayName}, something went wrong while trying to capture a tamagotchi for you.`
      );
      return;
    }

    twitchClient.say(
      channel,
      `${tamagotchiType.display} ... @${user.displayName} you captured a ${tamagotchiType.type}. Type '!tama name InsertNameHere' to name your new tamagothci.`
    );
  };

export default create;
