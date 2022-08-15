import { Events } from 'tmi.js';

import commands from './commands';

const customCommands: Record<string, Events['chat']> = {
  commands,
  help: commands,
};

export default customCommands;
