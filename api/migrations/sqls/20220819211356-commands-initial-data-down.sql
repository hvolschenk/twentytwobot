DELETE FROM `command` WHERE `name` IN (
  'bot',
  'commands',
  'goal',
  'lurk',
  'miss',
  'shoutout',
  'sprain',
  'surviving',
  'unlurk'
);

DELETE FROM `command_keyword` WHERE `keyword` IN (
  'bot',
  '22bot',
  'twentytwobot',
  'commands',
  'command',
  'help',
  'goal',
  'lurk',
  'lurkon',
  'miss',
  'shoutout',
  'so',
  'sprain',
  'ankle',
  'wrist',
  'surviving',
  'unlurk',
  'lurkoff'
);
