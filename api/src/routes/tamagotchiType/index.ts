import express from 'express';

import tamagotchiTypeGetByID from './getByID';
import { tamagotchiType } from './urls';

const router = express.Router();

router.get(tamagotchiType(), tamagotchiTypeGetByID);

export default router;
