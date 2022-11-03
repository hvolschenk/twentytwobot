import express from 'express';

import tamagotchiCare from './care';
import tamagotchiCreate from './create';
import tamagotchiDie from './die';
import tamagotchiGetAll from './getAll';
import tamagotchiGetByUsername from './getByUsername';
import tamagotchiNeglect from './neglect';
import tamagotchiUpdate from './update';
import { care, neglect, tamagotchi, tamagotchis, username } from './urls';

const router = express.Router();

router.delete(tamagotchi(), tamagotchiDie);

router.get(username(), tamagotchiGetByUsername);
router.get(tamagotchis(), tamagotchiGetAll);

router.post(care(), tamagotchiCare);
router.post(neglect(), tamagotchiNeglect);
router.post(tamagotchis(), tamagotchiCreate);

router.put(tamagotchi(), tamagotchiUpdate);

export default router;
