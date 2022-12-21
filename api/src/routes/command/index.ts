import express from 'express';

import commandCreate from './create';
import commandGetAll from './getAll';
import commandGetByID from './getByID';
import commandGetByKeyword from './getByKeyword';
import commandGetInvocationsByKeyword from './getInvocationsByKeyword';
import commandInvoke from './invoke';
import { command, commandByKeyword, invocationsByKeyword, invoke, root } from './urls';

const router = express.Router();

router.get(command(), commandGetByID);
router.get(commandByKeyword(), commandGetByKeyword);
router.get(invocationsByKeyword(), commandGetInvocationsByKeyword);
router.get(root(), commandGetAll);

router.post(root(), commandCreate);
router.post(invoke(), commandInvoke);

export default router;
