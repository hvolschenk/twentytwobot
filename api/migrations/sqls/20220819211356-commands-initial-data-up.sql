-- Insert the initial list of commands
-- DELETE ME
INSERT INTO `command`(`name`, `command`, `description`)
VALUES
  (
    'bot',
    'Hey, I am @twentytwobot. Built by @22atreyu22 for (t)his channel. Type !commands or !help to see what I can do.',
    'Explain what @twentytwobot is and does'
  ),
  (
    'commands',
    null,
    'Show a list of all available commands'
  ),
  (
    'goal',
    'Survive as long as possible by using only crafted items. More information: https://tinyurl.com/Neo-Native',
    'Show the goal(s) of this particular run'
  ),
  (
    'lurk',
    '@{userDisplayName {username}} is off to go do the thing.',
    'Use this command when you will be online, but uncontactable'
  ),
  (
    'miss',
    'Another miss! That makes it a total of {commandCount miss}.',
    'To lightly mock @22atreyu22 when he misses a shot with a weapon'
  ),
  (
    'shoutout',
    null,
    'To give a viewer in chat the praise that they deserve'
  ),
  (
    'sprain',
    'Another sprain! I am sure this survivor is made from glass. That makes it {commandCount sprain} sprains already.',
    'To count the amount of times Will/Astrid forget how to walk'
  ),
  (
    'surviving',
    'In 1962 sir Robert Viving invented surviving, also known as Sir Viving''s disease. Thanks to his efforts we are able to enjoy The Long Dark as it is today.',
    'A little joke'
  ),
  (
    'unlurk',
    '@{userDisplayName {username}} is back from doing the thing, yay!',
    'Use this command when you are back and contactable again'
  );

SELECT `id` INTO @COMMAND_ID_BOT FROM `command` WHERE `name` = 'bot';
SELECT `id` INTO @COMMAND_ID_COMMANDS FROM `command` WHERE `name` = 'commands';
SELECT `id` INTO @COMMAND_ID_GOAL FROM `command` WHERE `name` = 'goal';
SELECT `id` INTO @COMMAND_ID_LURK FROM `command` WHERE `name` = 'lurk';
SELECT `id` INTO @COMMAND_ID_MISS FROM `command` WHERE `name` = 'miss';
SELECT `id` INTO @COMMAND_ID_SHOUTOUT FROM `command` WHERE `name` = 'shoutout';
SELECT `id` INTO @COMMAND_ID_SPRAIN FROM `command` WHERE `name` = 'sprain';
SELECT `id` INTO @COMMAND_ID_SURVIVING FROM `command` WHERE `name` = 'surviving';
SELECT `id` INTO @COMMAND_ID_UNLURK FROM `command` WHERE `name` = 'unlurk';

INSERT INTO `command_keyword`(`keyword`, `commandID`, `isPrimary`)
VALUES
  ('bot', @COMMAND_ID_BOT, 1),
  ('22bot', @COMMAND_ID_BOT, 0),
  ('twentytwobot', @COMMAND_ID_BOT, 0),
  ('commands', @COMMAND_ID_COMMANDS, 1),
  ('command', @COMMAND_ID_COMMANDS, 0),
  ('help', @COMMAND_ID_COMMANDS, 0),
  ('goal', @COMMAND_ID_GOAL, 1),
  ('challenge', @COMMAND_ID_GOAL, 0),
  ('lurk', @COMMAND_ID_LURK, 1),
  ('lurkon', @COMMAND_ID_LURK, 0),
  ('miss', @COMMAND_ID_MISS, 1),
  ('shoutout', @COMMAND_ID_SHOUTOUT, 1),
  ('shout', @COMMAND_ID_SHOUTOUT, 0),
  ('so', @COMMAND_ID_SHOUTOUT, 0),
  ('sprain', @COMMAND_ID_SPRAIN, 1),
  ('ankle', @COMMAND_ID_SPRAIN, 0),
  ('wrist', @COMMAND_ID_SPRAIN, 0),
  ('surviving', @COMMAND_ID_SURVIVING, 1),
  ('unlurk', @COMMAND_ID_UNLURK, 1),
  ('lurkoff', @COMMAND_ID_UNLURK, 0);
