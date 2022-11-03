DELETE FROM `command` WHERE `name` = 'tamagotchi';

DELETE FROM `command_keyword` WHERE `keyword` IN (
  'tama',
  'tamagotchi',
  'pet'
);
