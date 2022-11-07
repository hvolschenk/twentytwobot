import express from 'express';

import shoutoutLogFilter from './filterLogs';
import shoutoutLog from './log';
import { log, logFilter } from './urls';

const router = express.Router();

router.get(logFilter(), shoutoutLogFilter);

router.post(log(), shoutoutLog);

export default router;
