import { Events } from 'tmi.js';

import userLogPart from '../database/userLogPart';

const part: Events['part'] = async (channel, username) => {
  await userLogPart({ username });
};

export default part;
