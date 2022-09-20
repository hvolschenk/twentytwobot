import { Events } from 'tmi.js';

import commands from './commands';
import pointsgamble from './pointsgamble';
import points from './points';
import pointsgive from './pointsgive';
import pointstop from './pointstop';
import shoutout from './shoutout';
import tamagotchi from './tamagotchi';
import tamagotchitop from './tamagotchitop';

const customCommands: Record<string, Events['chat']> = {
  commands,
  gamble: pointsgamble,
  give: pointsgive,
  help: commands,
  leaderboard: pointstop,
  pet: tamagotchi,
  pettop: tamagotchitop,
  points,
  pointsgamble,
  pointsgive,
  pointstop,
  scores: pointstop,
  shout: shoutout,
  shoutout,
  so: shoutout,
  tama: tamagotchi,
  tamatop: tamagotchitop,
  tamagotchi,
  tamagotchitop,
  top: pointstop,
  wager: pointsgamble,
};

export default customCommands;
