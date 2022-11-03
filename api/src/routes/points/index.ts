import express from 'express';

import pointsAdd from './add';
import pointsGetByUsername from './getByUsername';
import pointsGetTop from './getTop';
import pointsGive from './give';
import pointsRemove from './remove';
import { add, give, remove, top, username } from './urls';

const router = express.Router();

router.get(username(), pointsGetByUsername);
router.get(top(), pointsGetTop);

router.post(add(), pointsAdd);
router.post(give(), pointsGive);
router.post(remove(), pointsRemove);

export default router;
