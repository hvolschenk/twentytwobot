import express from 'express';

import userCreate from './create';
import userGetByUsername from './getByUsername';
import userJoinByUsername from './joinByUsername';
import userPartByUsername from './partByUsername';
import userUpdate from './update';
import {
  byUsername,
  joinByUsername,
  partByUsername,
  user,
  users,
} from './urls';

const router = express.Router();

router.get(byUsername(), userGetByUsername);

router.post(joinByUsername(), userJoinByUsername);
router.post(partByUsername(), userPartByUsername);
router.post(users(), userCreate);

router.put(user(), userUpdate);

export default router;
