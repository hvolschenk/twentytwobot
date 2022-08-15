import { Events } from 'tmi.js';

import commandKeywordGetAllByCommandID from '../database/commandKeywordGetAllByCommandID';
import commandKeywordGetAllPrimary from '../database/commandKeywordGetAllPrimary';
import commandGetByKeyword from '../database/commandGetByKeyword';
import getTwitchClient from '../shared/getTwitchClient';

const commands: Events['chat'] = async (channel, tags, message) => {
  const twitchClient = getTwitchClient();
  const parts = message.split(' ');

  if (parts.length > 1) {
    const keyword = parts[1].replace('!', '');
    const command = await commandGetByKeyword({ keyword });
    if (!command) {
      twitchClient.say(
        channel,
        `@${tags.username}, there is no '${keyword}' command. Type !commands for a list of available commands.`
      );
      return;
    }
    const commandKeywords = await commandKeywordGetAllByCommandID({
      id: command.id,
    });
    const keywords = commandKeywords
      .map((commandKeyword) => commandKeyword.keyword)
      .map((commandKeyword) => `!${commandKeyword}`)
      .join(', ');
    twitchClient.say(
      channel,
      `Command: !${keyword}. ${command.description}. Synonyms: ${keywords}.`
    );
  } else {
    const commandKeywords = await commandKeywordGetAllPrimary();
    const allCommands = commandKeywords
      .map((commandKeyword) => `!${commandKeyword}`)
      .join(', ');
    twitchClient.say(
      channel,
      `Available commands are: ${allCommands}. Type !help [command] to get help with a specific command.`
    );
  }
};

export default commands;
