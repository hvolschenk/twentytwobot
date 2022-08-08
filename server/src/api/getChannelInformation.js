const twitch = require('../shared/twitch');

const getChannelInformation = (userID) =>
  twitch({
    method: 'GET',
    url: `/channels?broadcaster_id=${userID}`,
  }).then((response) => response.data.data[0]);

module.exports = getChannelInformation;
