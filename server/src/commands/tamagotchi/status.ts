import { Events } from 'tmi.js';

import getTwitchClient from '../../shared/getTwitchClient';
import { Tamagotchi } from '../../types/Tamagotchi';
import { TamagotchiType } from '../../types/TamagotchiType';
import { User } from '../../types/User';

interface StatusOptions {
  tamagotchi: Tamagotchi;
  tamagotchiType: TamagotchiType;
  user: User;
}

const status =
  ({ tamagotchi, tamagotchiType, user }: StatusOptions): Events['chat'] =>
  async (channel) => {
    const twitchClient = getTwitchClient();
    twitchClient.say(
      channel,
      `${tamagotchiType.display} ... @${user.displayName}/${tamagotchi.name}. Food: ${tamagotchi.food}/10; Entertainment: ${tamagotchi.entertainment}/10; Clean: ${tamagotchi.clean}/10. Type '!help tama' for help.`
    );
  };

export default status;
