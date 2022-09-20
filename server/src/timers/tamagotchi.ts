import tamagotchiDieByID from '../database/tamagotchiDieByID';
import tamagotchiGetByID from '../database/tamagotchiGetByID';
import tamagotchiGetForCleanLoss from '../database/tamagotchiGetForCleanLoss';
import tamagotchiGetForEntertainmentLoss from '../database/tamagotchiGetForEntertainmentLoss';
import tamagotchiGetForFoodLoss from '../database/tamagotchiGetForFoodLoss';
import tamagotchiLoseClean from '../database/tamagotchiLoseClean';
import tamagotchiLoseEntertainment from '../database/tamagotchiLoseEntertainment';
import tamagotchiLoseFood from '../database/tamagotchiLoseFood';
import getTwitchClient from '../shared/getTwitchClient';
import { Tamagotchi } from '../types/Tamagotchi';

let hasStarted: boolean = false;

const startTamagotchiTimers = (channel: string) => {
  if (!hasStarted) {
    const twitchClient = getTwitchClient();
    hasStarted = true;
    setInterval(async () => {
      const [
        tamagotchisCleanLoss,
        tamagotchisEntertainmentLoss,
        tamagotchisFoodLoss,
      ] = await Promise.all([
        tamagotchiGetForCleanLoss({ timeMinutes: 60 }),
        tamagotchiGetForEntertainmentLoss({ timeMinutes: 45 }),
        tamagotchiGetForFoodLoss({ timeMinutes: 30 }),
      ]);
      const lossPromises: Promise<void>[] = [];
      if (tamagotchisCleanLoss.length > 0) {
        const cleanPromises = tamagotchisCleanLoss.map((tamagotchi) =>
          tamagotchiLoseClean({ clean: 1, id: tamagotchi.id })
        );
        lossPromises.push(...cleanPromises);
      }
      if (tamagotchisEntertainmentLoss.length > 0) {
        const cleanPromises = tamagotchisEntertainmentLoss.map((tamagotchi) =>
          tamagotchiLoseEntertainment({ entertainment: 1, id: tamagotchi.id })
        );
        lossPromises.push(...cleanPromises);
      }
      if (tamagotchisFoodLoss.length > 0) {
        const cleanPromises = tamagotchisFoodLoss.map((tamagotchi) =>
          tamagotchiLoseFood({ food: 1, id: tamagotchi.id })
        );
        lossPromises.push(...cleanPromises);
      }
      await Promise.all(lossPromises);

      const fetchPromises: Promise<Tamagotchi | null>[] = [
        ...tamagotchisCleanLoss,
        ...tamagotchisEntertainmentLoss,
        ...tamagotchisFoodLoss,
      ].map((tamagotchi) => tamagotchiGetByID({ id: tamagotchi.id }));

      const updatedTamagotchis = await Promise.all(fetchPromises);
      const deadTamagotchis = updatedTamagotchis
        .filter((tamagotchi): tamagotchi is Tamagotchi => tamagotchi !== null)
        .filter((tamagotchi) => {
          const noClean = tamagotchi.clean === 0;
          const noEntertainment = tamagotchi.entertainment === 0;
          const noFood = tamagotchi.food === 0;
          const dead = noClean
            ? noEntertainment || noFood
            : noEntertainment && noFood;
          return dead;
        })
        .filter((tamagotchi, index, originalArray) => {
          const firstIndex = originalArray.findIndex(
            (value) => value.id === tamagotchi.id
          );
          return index === firstIndex;
        });
      const deadPromises: Promise<void>[] = deadTamagotchis.map((tamagotchi) =>
        tamagotchiDieByID({ id: tamagotchi.id })
      );
      await Promise.all(deadPromises);

      // eslint-disable-next-line no-restricted-syntax
      for (const tamagotchi of deadTamagotchis) {
        twitchClient.say(
          channel,
          `@${tamagotchi.username}, ${tamagotchi.name} did not make it. Sadface. You can type '!tama' to try again.`
        );
      }
    }, 60 * 1000);
  }
};

export default startTamagotchiTimers;
