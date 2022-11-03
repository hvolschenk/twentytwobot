import express from 'express';

import timerGetAll from './getAll';
import timerMessageGetRandomByTimerID from './messageGetRandomByTimerID';
import { timerMessage, timers } from './urls';

const router = express.Router();

router.get(timerMessage(), timerMessageGetRandomByTimerID);
router.get(timers(), timerGetAll);

export default router;
