import { Events } from 'tmi.js';

import tamagotchiGetTop from '../api/tamagotchiGetTop';
import getTwitchClient from '../shared/getTwitchClient';
import { TamagotchiWithUser } from '../types/TamagotchiWithUser';

const getTopTamagotchis = async (
  count: number
): Promise<TamagotchiWithUser[]> => {
  try {
    const tamagotchis = await tamagotchiGetTop({ count });
    return tamagotchis.status === 200 ? tamagotchis.data : [];
  } catch (error) {
    return [];
  }
};

const tamagotchitop: Events['chat'] = async (channel, tags, message) => {
  const twitchClient = getTwitchClient();
  const parts = message.split(' ');
  const count = parseInt(parts[1], 10) || 10;
  const tamagotchis = await getTopTamagotchis(count);
  const response = tamagotchis
    .filter((tamagotchi) => tamagotchi.user.username !== '22atreyu22')
    .reduce((accumulator, tamagotchi, index) => {
      const days = Math.floor(
        ((tamagotchi.dateDied || new Date().getTime()) -
          tamagotchi.dateCreated) /
          (1 * 24 * 60 * 60 * 1000)
      );
      return `${accumulator} - ${index + 1}. @${tamagotchi.user.displayName}/${
        tamagotchi.name
      }: ${days.toLocaleString('en')}`;
    }, '');
  twitchClient.say(channel, response);
};

export default tamagotchitop;
