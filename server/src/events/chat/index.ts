import { Events } from 'tmi.js';

import commandGetAll from '../../api/commandGetAll';
import commandInvoke from '../../api/commandInvoke';
import customCommands from '../../commands';
import updateUserDetails from '../../helpers/updateUserDetails';
import getTwitchClient from '../../shared/getTwitchClient';
import { Command } from '../../types/Command';
import { CommandWithKeywords } from '../../types/CommandWithKeywords';
import { User } from '../../types/User';
import autoShoutout from './autoShoutout';
import commandParser from './commandParser';

const getCommands = async (): Promise<CommandWithKeywords[]> => {
  try {
    const commands = await commandGetAll();
    return commands.status === 200 ? commands.data : [];
  } catch (error) {
    return [];
  }
};

const invokeCommand = async (
  commandID: Command['id'],
  username: User['username']
): Promise<boolean> => {
  try {
    const invocation = await commandInvoke({ commandID, username });
    return invocation.status === 204;
  } catch (error) {
    return false;
  }
};

const parseCommand = async (
  command: string,
  message: string,
  username: User['username']
): Promise<string | null> => {
  try {
    const parsedMessage = await commandParser({ command, message, username });
    return parsedMessage;
  } catch (error) {
    return null;
  }
};

const shoutout = async (
  channel: string,
  usernameTo: User['username']
): Promise<boolean> => {
  try {
    await autoShoutout({ channel, usernameTo });
    return true;
  } catch (error) {
    return false;
  }
};

const userUpdate = async (username: User['username']): Promise<boolean> => {
  try {
    await updateUserDetails({ username });
    return true;
  } catch (error) {
    return false;
  }
};

const chat: Events['chat'] = async (channel, tags, message, self) => {
  const twitchClient = getTwitchClient();

  if (!tags.username) {
    return;
  }

  await shoutout(channel, tags.username);

  if (!message.startsWith('!')) {
    return;
  }

  await userUpdate(tags.username);

  const keyword = message.split(' ')[0].replace('!', '').toLowerCase();
  const commands = await getCommands();
  const command = commands.find((commandWithKeywords) => {
    const foundCommandKeyword = commandWithKeywords.keywords.find(
      (commandKeyword) => commandKeyword.keyword === keyword
    );
    return Boolean(foundCommandKeyword);
  });

  if (!command) {
    twitchClient.say(
      channel,
      `I promise I tried my best, @${tags.username}, but there is no '!${keyword}' command.`
    );
    return;
  }

  if (!invokeCommand(command.id, tags.username)) {
    return;
  }

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

  const messageToSend = await parseCommand(
    command.command,
    message,
    tags.username
  );
  if (!messageToSend) {
    twitchClient.say(
      channel,
      `I promise I tried my best, @${tags.username}, but I failed to parse the command`
    );
    return;
  }
  twitchClient.say(channel, messageToSend);
};

export default chat;
