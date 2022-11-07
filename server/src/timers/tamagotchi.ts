/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import tamagotchiDie from '../api/tamagotchiDie';
import tamagotchiGetAll from '../api/tamagotchiGetAll';
import tamagotchiNeglect from '../api/tamagotchiNeglect';
import getTwitchClient from '../shared/getTwitchClient';
import { TamagotchiWithUser } from '../types/TamagotchiWithUser';

let hasStarted: boolean = false;

interface TamagotchiCheckDeathOptions {
  channel: string;
  deadTamagotchis: number[];
  loseClean?: number;
  loseEntertainment?: number;
  loseFood?: number;
  tamagotchi: TamagotchiWithUser;
}

const tamagotchiCheckDeath = async ({
  channel,
  deadTamagotchis,
  loseClean = 0,
  loseEntertainment = 0,
  loseFood = 0,
  tamagotchi,
}: TamagotchiCheckDeathOptions): Promise<void> => {
  const noClean = tamagotchi.clean - loseClean === 0;
  const noEntertainment = tamagotchi.entertainment - loseEntertainment === 0;
  const noFood = tamagotchi.food - loseFood === 0;
  const dead = noClean ? noEntertainment || noFood : noEntertainment && noFood;
  if (dead && !deadTamagotchis.includes(tamagotchi.id)) {
    const tamagotchiDieResult = await tamagotchiDie({ id: tamagotchi.id });
    if (tamagotchiDieResult.status === 204) {
      deadTamagotchis.push(tamagotchi.id);
      const twitchClient = getTwitchClient();
      twitchClient.say(
        channel,
        `@${tamagotchi.user.displayName}, ${tamagotchi.name} did not make it. Sadface. You can type '!tama' to try again.`
      );
    }
  }
};

const timerTamagotchi = (channel: string) => {
  if (!hasStarted) {
    hasStarted = true;
    setInterval(async () => {
      const deadTamagotchis: number[] = [];
      const tamagotchis = await tamagotchiGetAll();
      if (tamagotchis.status !== 200) {
        return;
      }
      for (const tamagotchi of tamagotchis.data) {
        if (
          Date.now() - new Date(tamagotchi.dateLossClean).getTime() >
          2 * 60 * 60 * 1000
        ) {
          await tamagotchiNeglect({ clean: 1, id: tamagotchi.id });
          await tamagotchiCheckDeath({
            channel,
            deadTamagotchis,
            loseClean: 1,
            tamagotchi,
          });
        }
        if (
          Date.now() - new Date(tamagotchi.dateLossEntertainment).getTime() >
          1.5 * 60 * 60 * 1000
        ) {
          await tamagotchiNeglect({ entertainment: 1, id: tamagotchi.id });
          await tamagotchiCheckDeath({
            channel,
            deadTamagotchis,
            loseEntertainment: 1,
            tamagotchi,
          });
        }
        if (
          Date.now() - new Date(tamagotchi.dateLossFood).getTime() >
          60 * 60 * 1000
        ) {
          await tamagotchiNeglect({ food: 1, id: tamagotchi.id });
          await tamagotchiCheckDeath({
            channel,
            deadTamagotchis,
            loseFood: 1,
            tamagotchi,
          });
        }
      }
    }, 5 * 60 * 1000);
  }
};

export default timerTamagotchi;
