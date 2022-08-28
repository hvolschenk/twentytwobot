import { Events } from 'tmi.js';

import commands from './commands';
import pointsgamble from './pointsgamble';
import points from './points';
import pointsgive from './pointsgive';
import pointstop from './pointstop';
import shoutout from './shoutout';

const customCommands: Record<string, Events['chat']> = {
  commands,
  gamble: pointsgamble,
  give: pointsgive,
  help: commands,
  leaderboard: pointstop,
  points,
  pointsgamble,
  pointsgive,
  pointstop,
  scores: pointstop,
  shout: shoutout,
  shoutout,
  so: shoutout,
  top: pointstop,
  wager: pointsgamble,
};

export default customCommands;
