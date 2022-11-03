DELETE FROM `command` WHERE `name` IN (
  'points',
  'pointsgamble',
  'pointsgive',
  'pointstop'
);

DELETE FROM `command_keyword` WHERE `keyword` IN (
  'points',
  'score',
  'pointsgamble',
  'gamble',
  'wager',
  'pointsgive',
  'give',
  'pointstop',
  'leaderboard',
  'scores',
  'top'
);
