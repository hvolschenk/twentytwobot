import { Events } from 'tmi.js';

import tamagotchiGetTop from '../database/tamagotchiGetTop';
import getTwitchClient from '../shared/getTwitchClient';

const tamagotchitop: Events['chat'] = async (channel, tags, message) => {
  const twitchClient = getTwitchClient();
  const parts = message.split(' ');
  const count = parseInt(parts[1], 10) || 10;
  const tamagotchis = await tamagotchiGetTop({ count });
  const response = tamagotchis.reduce((accumulator, tamagotchi, index) => {
    const days = Math.floor(
      ((tamagotchi.dateDied || new Date().getTime()) - tamagotchi.dateCreated) /
        (1 * 24 * 60 * 60 * 1000)
    );
    return `${accumulator}\n${index + 1}. @${tamagotchi.displayName}/${
      tamagotchi.name
    }: ${days.toLocaleString('en')};`;
  }, '');
  twitchClient.say(channel, response);
};

export default tamagotchitop;
