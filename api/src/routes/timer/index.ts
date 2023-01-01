import express from 'express';

import timerGetAll from './getAll';
import timerGetByID from './getByID';
import timerMessageGetRandomByTimerID from './messageGetRandomByTimerID';
import { timer, timerMessage, timers } from './urls';

const router = express.Router();

router.get(timer(), timerGetByID);
router.get(timerMessage(), timerMessageGetRandomByTimerID);
router.get(timers(), timerGetAll);

export default router;
