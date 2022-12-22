import commandGetInvocationsByKeyword from '../../api/commandGetInvocationsByKeyword';
import userGetByUsername from '../../api/userGetByUsername';
import { CommandKeyword } from '../../types/CommandKeyword';
import { CommandWithInvocations } from '../../types/CommandWithInvocations';
import { User } from '../../types/User';

const getCommandInvocations = async (
  keyword: CommandKeyword['keyword']
): Promise<CommandWithInvocations | null> => {
  try {
    const command = await commandGetInvocationsByKeyword({ keyword });
    return command.status === 200 ? command.data : null;
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

interface Replacer {
  identifier: string;
  matcher: RegExp;
  replacer(
    variable: string,
    command: string,
    message: string,
    username?: string
  ): Promise<string>;
}

const replacers: Replacer[] = [
  {
    identifier: 'Argument number N',
    matcher: /^[0-9]+$/,
    replacer: async (variable, command, message) => {
      const argNumber = parseInt(variable, 10);
      const args = message.split(' ');
      return args.length > argNumber ? args[argNumber] : '';
    },
  },
  {
    identifier: 'Command invocations count',
    matcher: /commandCount .+/,
    replacer: async (variable) => {
      const keyword = variable.split(' ')[1].replace('!', '');
      const command = await getCommandInvocations(keyword);
      return command ? command.invocations.toString() : '0';
    },
  },
  {
    identifier: 'Lowercase',
    matcher: /^lowercase .+$/,
    replacer: async (variable) => variable.split(' ')[1].toLowerCase(),
  },
  {
    identifier: 'Replace',
    matcher: /^replace .+\|.*\|.+$/,
    replacer: async (variable) => {
      const parts = variable.split(' ')[1].split('|');
      return parts[2].replace(parts[0], parts[1] || '');
    },
  },
  {
    identifier: 'Username',
    matcher: /^username$/,
    replacer: async (variable, command, message, username) => username || '',
  },
  {
    identifier: 'User display name',
    matcher: /^userDisplayName [@a-zA-Z0-9_]+$/,
    replacer: async (variable) => {
      const username = variable.split(' ')[1].replace('@', '');
      const user = await getUser(username);
      return user ? user.displayName : username;
    },
  },
  {
    identifier: 'User last game played',
    matcher: /^userLastGamePlayed [@a-zA-Z0-9]+$/,
    replacer: async (variable) => {
      const username = variable.split(' ')[1].replace('@', '');
      const user = await getUser(username);
      return user ? user.lastGamePlayed : '-';
    },
  },
];

// -----------------------------------------------------------------------------

interface CommandParserOptions {
  command: string;
  message: string;
  username?: string;
}

const MAXIMUM_PASSES = 10;

const commandParser = async ({
  command,
  message,
  username,
}: CommandParserOptions): Promise<string> => {
  let commandParsed = command;
  let passes = 0;
  while (commandParsed.includes('{') && passes < MAXIMUM_PASSES) {
    passes += 1;
    const commandVariablesMatcher = /\{[@a-zA-Z0-9_| ]+\}/g;
    const matches = commandParsed.match(commandVariablesMatcher);
    if (matches) {
      // we have to use `for of` here as a loop with `forEach` will create additional clossures
      // eslint-disable-next-line no-restricted-syntax
      for (const match of matches) {
        const variable = match.slice(1, -1);
        const replacer = replacers.find((potentialReplacer) =>
          potentialReplacer.matcher.test(variable)
        );
        if (replacer) {
          // eslint-disable-next-line no-await-in-loop
          const replaceWith = await replacer.replacer(
            variable,
            commandParsed,
            message,
            username
          );
          commandParsed = commandParsed.replace(match, replaceWith);
        }
      }
    }
  }
  if (passes === 10) {
    commandParsed = `Even with ${MAXIMUM_PASSES} passes, the command still could not be parsed. @22atreyu22, please fix.`;
  }
  return commandParsed;
};

export default commandParser;
