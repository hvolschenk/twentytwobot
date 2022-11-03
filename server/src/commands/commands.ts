import { Events } from 'tmi.js';

import commandGetByKeyword from '../api/commandGetByKeyword';
import commandGetAll from '../api/commandGetAll';
import getTwitchClient from '../shared/getTwitchClient';
import { CommandKeyword } from '../types/CommandKeyword';
import { CommandWithKeywords } from '../types/CommandWithKeywords';

const getAllCommands = async (): Promise<CommandWithKeywords[]> => {
  try {
    const allCommands = await commandGetAll();
    return allCommands.status === 200 ? allCommands.data : [];
  } catch (error) {
    return [];
  }
};

const getCommandByKeyword = async (
  keyword: CommandKeyword['keyword']
): Promise<CommandWithKeywords | null> => {
  try {
    const command = await commandGetByKeyword({ keyword });
    return command.status === 200 ? command.data : null;
  } catch (error) {
    return null;
  }
};

const commands: Events['chat'] = async (channel, tags, message) => {
  const twitchClient = getTwitchClient();
  const parts = message.split(' ');

  if (parts.length > 1) {
    const keyword = parts[1].replace('!', '');
    const command = await getCommandByKeyword(keyword);
    if (!command) {
      twitchClient.say(
        channel,
        `@${tags.username}, there is no '${keyword}' command. Type !commands for a list of available commands.`
      );
      return;
    }
    const keywords = command.keywords
      .map((commandKeyword) => `!${commandKeyword.keyword}`)
      .join(', ');
    twitchClient.say(
      channel,
      `Command: !${keyword}. ${command.description}. Synonyms: ${keywords}.`
    );
  } else {
    const allCommands = await getAllCommands();
    const commandsString = allCommands
      .map((command) => command.keywords)
      .map((keywords) => keywords.find((keyword) => keyword.isPrimary))
      .filter((command): command is CommandKeyword => Boolean(command))
      .map((command) => command.keyword)
      .join(', ');
    twitchClient.say(
      channel,
      `Available commands are: ${commandsString}. Type !help [command] to get help with a specific command.`
    );
  }
};

export default commands;
