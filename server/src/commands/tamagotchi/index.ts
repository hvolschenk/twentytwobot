import { Events } from 'tmi.js';

import care from './care';
import clean from './clean';
import create from './create';
import feed from './feed';
import name from './name';
import play from './play';
import status from './status';
import tamagotchiGetByUsername from '../../api/tamagotchiGetByUsername';
import tamagotchiTypeGetByID from '../../api/tamagotchiTypeGetByID';
import userGetByUsername from '../../api/userGetByUsername';
import getTwitchClient from '../../shared/getTwitchClient';
import { TamagotchiType } from '../../types/TamagotchiType';
import { TamagotchiWithUser } from '../../types/TamagotchiWithUser';
import { User } from '../../types/User';

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

const getUser = async (username: User['username']): Promise<User | null> => {
  try {
    const user = await userGetByUsername({ username });
    return user.status === 200 ? user.data : null;
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
const tamagotchi: Events['chat'] = async (channel, tags, message, self) => {
  const twitchClient = getTwitchClient();

  if (!tags.username) {
    return;
  }

  const user = await getUser(tags.username);
  if (!user) {
    return;
  }

  const userTamagotchi = await getUserTamagotchi(tags.username);
  if (!userTamagotchi) {
    await create({ user })(channel, tags, message, self);
    return;
  }

  const tamagotchiType = await getTamagotchiType(
    userTamagotchi.tamagotchiTypeID
  );
  if (!tamagotchiType) {
    twitchClient.say(
      channel,
      `@${user.displayName}, there was an error fetching your tamagotchi information.`
    );
    return;
  }

  const parts = message.split(' ');
  if (parts.length <= 1) {
    await status({ tamagotchi: userTamagotchi, tamagotchiType, user })(
      channel,
      tags,
      message,
      self
    );
    return;
  }

  switch (parts[1]) {
    case 'care':
      await care({ tamagotchi: userTamagotchi, tamagotchiType, user })(
        channel,
        tags,
        message,
        self
      );
      break;
    case 'clean':
      await clean({ tamagotchi: userTamagotchi, tamagotchiType, user })(
        channel,
        tags,
        message,
        self
      );
      break;
    case 'feed':
      await feed({ tamagotchi: userTamagotchi, tamagotchiType, user })(
        channel,
        tags,
        message,
        self
      );
      break;
    case 'name':
      await name({ tamagotchi: userTamagotchi, tamagotchiType, user })(
        channel,
        tags,
        message,
        self
      );
      break;
    case 'play':
      await play({ tamagotchi: userTamagotchi, tamagotchiType, user })(
        channel,
        tags,
        message,
        self
      );
      break;
    default:
      twitchClient.say(
        channel,
        `Sorry @${user.displayName}, ${userTamagotchi.name} does not know how to ${parts[1]}, try '!help tama' for available commands.`
      );
      break;
  }
};

export default tamagotchi;
