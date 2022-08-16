import { Events } from 'tmi.js';

import customCommands from '../../commands';
import commandGetAll from '../../database/commandGetAll';
import commandLogCreate from '../../database/commandLogCreate';
import updateUserDetails from '../../helpers/updateUserDetails';
import getTwitchClient from '../../shared/getTwitchClient';
import commandParser from './commandParser';

const chat: Events['chat'] = async (channel, tags, message, self) => {
  const twitchClient = getTwitchClient();

  if (!message.startsWith('!') || !tags.username) {
    return;
  }

  await updateUserDetails({ username: tags.username });

  const allCommands = await commandGetAll();
  const keyword = message.split(' ')[0].replace('!', '').toLowerCase();

  const command = allCommands.find(
    (commandWithKeyword) => commandWithKeyword.keyword === keyword
  );

  if (!command) {
    twitchClient.say(
      channel,
      `I promise I tried my best, @${tags.username}, but there is no '!${keyword}' command.`
    );
    return;
  }

  await commandLogCreate({
    commandID: command.commandID,
    username: tags.username,
  });

  if (customCommands[keyword]) {
    customCommands[keyword](channel, tags, message, self);
    return;
  }

  if (command.command === null) {
    twitchClient.say(
      channel,
      `I promise I tried my best, @${tags.username}, but it seems that @22atreyu22 never populated this command with any content. Give him a hard time in chat!`
    );
    return;
  }

  try {
    const messageToSend = await commandParser({
      command: command.command,
      message,
      username: tags.username,
    });
    twitchClient.say(channel, messageToSend);
  } catch (error) {
    twitchClient.say(
      channel,
      `I promise I tried my best, @${
        tags.username
      }, but I failed to parse the command: ${(error as Error).message}`
    );
  }
};

export default chat;
