import { Events } from 'tmi.js';

import tamagotchiClean from '../database/tamagotchiClean';
import tamagotchiCreate from '../database/tamagotchiCreate';
import tamagotchiEntertain from '../database/tamagotchiEntertain';
import tamagotchiFeed from '../database/tamagotchiFeed';
import tamagotchiGetByUsername from '../database/tamagotchiGetByUsername';
import tamagotchiRenameByUsername from '../database/tamagotchiRenameByUsername';
import tamagotchiTypeGetByID from '../database/tamagotchiTypeGetByID';
import userGetByUsername from '../database/userGetByUsername';
import getTwitchClient from '../shared/getTwitchClient';

const tamagotchi: Events['chat'] = async (channel, tags, message) => {
  const twitchClient = getTwitchClient();
  const parts = message.split(' ');
  if (tags.username) {
    const user = await userGetByUsername({ username: tags.username });
    if (user) {
      let userTamagotchi = await tamagotchiGetByUsername({
        username: tags.username,
      });
      if (!userTamagotchi) {
        if (parts.length > 1) {
          twitchClient.say(
            channel,
            `@${user.displayName}, you do not have a tamagotchi yet. Use '!tama' to capture one.`
          );
          return;
        }
        await tamagotchiCreate({ username: tags.username });
        userTamagotchi = await tamagotchiGetByUsername({
          username: tags.username,
        });
        if (!userTamagotchi) {
          twitchClient.say(
            channel,
            `@${user.displayName}, something went wrong while trying to capture a tamagotchi for you.`
          );
          return;
        }
        const tamagotchiType = await tamagotchiTypeGetByID({
          id: userTamagotchi.tamagotchiTypeID,
        });
        if (!tamagotchiType) {
          twitchClient.say(
            channel,
            `@${user.displayName}, something went wrong while trying to capture a tamagotchi for you.`
          );
          return;
        }
        twitchClient.say(
          channel,
          `${tamagotchiType.display} ... @${user.displayName} you captured a ${tamagotchiType.type}. Type '!tama name InsertNameHere' to name your new tamagothci.`
        );
        return;
      }
      const tamagotchiType = await tamagotchiTypeGetByID({
        id: userTamagotchi.tamagotchiTypeID,
      });
      if (!tamagotchiType) {
        twitchClient.say(
          channel,
          `@${user.displayName}, there was an error fetching your tamagotchi information.`
        );
        return;
      }
      if (parts.length === 1) {
        twitchClient.say(
          channel,
          `${tamagotchiType.display} ... @${user.displayName}/${userTamagotchi.name}. Food: ${userTamagotchi.food}/10; Entertainment: ${userTamagotchi.entertainment}/10; Clean: ${userTamagotchi.clean}/10. Type '!help tama' for help.`
        );
        return;
      }

      if (parts[1] === 'care') {
        await tamagotchiClean({ clean: 10, username: tags.username });
        await tamagotchiEntertain({
          entertainment: 10,
          username: tags.username,
        });
        await tamagotchiFeed({ food: 10, username: tags.username });
        twitchClient.say(
          channel,
          `${tamagotchiType.display} ... @${user.displayName} you took great care of all required needs for ${userTamagotchi.name}, and they are all at 10 again. Yay.`
        );
        return;
      }
      if (parts[1] === 'feed') {
        await tamagotchiFeed({ food: 10, username: tags.username });
        twitchClient.say(
          channel,
          `${tamagotchiType.display} ... @${user.displayName} you gave ${
            userTamagotchi.name
          } a delicious treat. Food ${Math.min(
            userTamagotchi.food + 10,
            10
          )}/10.`
        );
        return;
      }
      if (parts[1] === 'play') {
        await tamagotchiEntertain({
          entertainment: 10,
          username: tags.username,
        });
        twitchClient.say(
          channel,
          `${tamagotchiType.display} ... @${
            user.displayName
          } you played fetch with ${
            userTamagotchi.name
          }. Entertainment ${Math.min(
            userTamagotchi.entertainment + 10,
            10
          )}/10.`
        );
        return;
      }
      if (parts[1] === 'clean') {
        await tamagotchiClean({ clean: 10, username: tags.username });
        twitchClient.say(
          channel,
          `${tamagotchiType.display} ... @${user.displayName} you gave ${
            userTamagotchi.name
          } a good scrub. Clean ${Math.min(userTamagotchi.clean + 10, 10)}/10.`
        );
        return;
      }
      if (parts[1] === 'name') {
        if (parts.length === 2) {
          twitchClient.say(
            channel,
            `@${user.displayName} please provide a name, for example '!tama name InsertNameHere'.`
          );
          return;
        }
        const name = parts[2].substring(0, 32);
        await tamagotchiRenameByUsername({ name, username: tags.username });
        twitchClient.say(
          channel,
          `@${user.displayName}, I am sure your tamagotchi is pleased with its new name: ${name}. Type '!tama' to see stats.`
        );
        return;
      }
      twitchClient.say(
        channel,
        `${user.displayName}, there is no '${parts[1]}' command for tamagotchis. Type '!help tama' for help.`
      );
    }
  }
};

export default tamagotchi;
