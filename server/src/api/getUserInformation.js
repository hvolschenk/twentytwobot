const twitch = require("../shared/twitch");

const getUserInformation = (username) =>
  twitch({
    method: "GET",
    url: `/users?login=${username}`,
  }).then((response) => response.data.data[0]);

module.exports = getUserInformation;
