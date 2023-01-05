import express from 'express';

import timerCreate from './create';
import timerGetAll from './getAll';
import timerGetByID from './getByID';
import timerMessageGetRandomByTimerID from './messageGetRandomByTimerID';
import timerUpdate from './update';
import { timer, timerMessage, timers } from './urls';

const router = express.Router();

router.get(timer(), timerGetByID);
router.get(timerMessage(), timerMessageGetRandomByTimerID);
router.get(timers(), timerGetAll);

router.post(timers(), timerCreate);

router.put(timer(), timerUpdate);

export default router;
