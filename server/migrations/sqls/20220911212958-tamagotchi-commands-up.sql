INSERT INTO `command`(`name`, `command`, `description`)
VALUES
  (
    'tamagotchi',
    null,
    'Keep a tamagotchi alive. Use "!tama feed/play/clean/care/name" to interact with your tamagotchi'
  ),
  (
    'tamagotchitop',
    null,
    'See the leaderboard of all tamagotchis'
  );

SELECT `id` INTO @COMMAND_ID_TAMAGOTCHI FROM `command` WHERE `name` = 'tamagotchi';
SELECT `id` INTO @COMMAND_ID_TAMAGOTCHI_TOP FROM `command` WHERE `name` = 'tamagotchitop';

INSERT INTO `command_keyword`(`keyword`, `commandID`, `isPrimary`)
VALUES
  ('tama', @COMMAND_ID_TAMAGOTCHI, 1),
  ('tamagotchi', @COMMAND_ID_TAMAGOTCHI, 0),
  ('pet', @COMMAND_ID_TAMAGOTCHI, 0),
  ('tamatop', @COMMAND_ID_TAMAGOTCHI_TOP, 1),
  ('tamagotchitop', @COMMAND_ID_TAMAGOTCHI_TOP, 0),
  ('pettop', @COMMAND_ID_TAMAGOTCHI_TOP, 0);
