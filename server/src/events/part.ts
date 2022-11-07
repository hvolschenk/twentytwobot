import { Events } from 'tmi.js';

import userPartByUsername from '../api/userPartByUsername';

const part: Events['part'] = async (channel, username) => {
  try {
    await userPartByUsername({ username });
  } catch (error) {
    console.log('Error parting user', (error as Error).message);
  }
};

export default part;
