import express from 'express';

import commandGetAll from './getAll';
import commandGetByKeyword from './getByKeyword';
import commandGetInvocationsByKeyword from './getInvocationsByKeyword';
import commandInvoke from './invoke';
import { commandByKeyword, invocationsByKeyword, invoke, root } from './urls';

const router = express.Router();

router.get(commandByKeyword(), commandGetByKeyword);
router.get(invocationsByKeyword(), commandGetInvocationsByKeyword);
router.get(root(), commandGetAll);

router.post(invoke(), commandInvoke);

export default router;
